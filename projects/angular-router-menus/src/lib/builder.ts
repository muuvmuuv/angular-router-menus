import {
	EnvironmentInjector,
	type WritableSignal,
	assertInInjectionContext,
	inject,
} from "@angular/core"
import { RouterPreloader, type Routes } from "@angular/router"
import { firstValueFrom } from "rxjs"

import { normalizePath, toEntries } from "./helper"
import type { MenuItem, MenuItems, MenuStacks } from "./menu"
import type { RouterMenusOptions } from "./options"

async function resolveLazyLoadedChildren(routes: Routes) {
	assertInInjectionContext(resolveLazyLoadedChildren)

	const injector = inject(EnvironmentInjector)
	const routerPreloader = inject(RouterPreloader)

	// @ts-expect-error The required method is not exported but private
	const loader = routerPreloader.loader as RouterConfigLoader

	async function resolveLazyLoop(_routes: Routes) {
		for (const route of _routes) {
			if (route.children) {
				await resolveLazyLoop(route.children)
			} else if (route.loadChildren) {
				// NOTE: This might break as it uses private and internal api's
				const importResolved = await firstValueFrom(loader.loadChildren(injector, route))
				// biome-ignore lint/suspicious/noExplicitAny: internal type
				const _resolvedRoutes = (importResolved as any).routes as Routes
				route.children = _resolvedRoutes
				await resolveLazyLoop(_resolvedRoutes)
			}
		}
	}

	await resolveLazyLoop(routes)
}

function filterRoutesWithMenu(routes: Routes) {
	return routes.reduce<Routes>((accumulator, item) => {
		if (item.menu) {
			if (item.children) {
				accumulator.push({ ...item, children: filterRoutesWithMenu(item.children) })
			} else {
				accumulator.push(item)
			}
		} else if (item.children) {
			const filteredItems = filterRoutesWithMenu(item.children)
			if (filteredItems.length > 0) {
				accumulator.push({ ...item, children: filteredItems })
			}
		}
		return accumulator
	}, [])
}

function convertRoutesToMenuItems(
	loopRoutes: Routes,
	options: RouterMenusOptions,
	parent?: MenuItem,
) {
	const menuItems: MenuItems = []

	for (const route of loopRoutes) {
		// Fix path and remove anomalies
		const href = normalizePath(`/${parent?.href ?? ""}/${route.path ?? ""}`)

		const menuItem: MenuItem = {
			label: "", // keep empty for later checks
			priority: route.menu?.priority ?? 0,
			in: route.menu?.in ?? options.defaultMenu,
			href,
		}

		if (route.menu) {
			// Set label only if its a menu item, this is also used to flatten
			// the menu items later and to differ between real menu items and just
			// paths that were required for the build process
			menuItem.label =
				route.menu.label ?? (typeof route.title === "string" ? route.title : "ERROR")
		}

		if (route.children) {
			menuItem.children = convertRoutesToMenuItems(route.children, options, menuItem)
		}

		menuItems.push(menuItem)
	}

	return menuItems
}

function buildMenu(data: MenuItems, inMenu: Menus) {
	return data.reduce<MenuItems>((accumulator, item) => {
		// It must have a label to be a valid menu entry which is empty as by
		// previous `convertRoutesToMenuItems` function.
		if (item.label && item.in === inMenu) {
			if (item.children) {
				accumulator.push({ ...item, children: buildMenu(item.children, inMenu) })
			} else {
				accumulator.push(item)
			}
		} else if (item.children) {
			const filteredItems = buildMenu(item.children, inMenu)
			if (filteredItems.length > 0) {
				accumulator.push(...filteredItems)
			}
		}
		return accumulator
	}, [])
}

function orderByPriority(items: MenuItems): MenuItems {
	items.sort((a, b) => a.priority - b.priority)

	for (const item of items) {
		if (item.children) {
			item.children = orderByPriority(item.children)
		}
	}

	return items
}

export async function buildRouterMenus(
	routes: Routes,
	menuStacks: MenuStacks,
	options: RouterMenusOptions,
) {
	assertInInjectionContext(buildRouterMenus)

	const injectedMenuStacks = {} as never as Record<Menus, WritableSignal<MenuItems>>
	for (const [stack, token] of toEntries(menuStacks)) {
		// We must inject them before all loops because we are not awaiting the builder
		injectedMenuStacks[stack] = inject(token)
	}

	// 1. We need to resolve all lazy async children

	await resolveLazyLoadedChildren(routes)

	// 2. Remove all routes that do not contain a menu property

	const filteredRoutes = filterRoutesWithMenu(routes)

	// 3. Convert the filtered routes to menu items

	const menuItems = convertRoutesToMenuItems(filteredRoutes, options)

	// 4. Now we build the menu stack based on "in" which they are located

	for (const [stack, token] of toEntries(injectedMenuStacks)) {
		const stackMenu = orderByPriority(buildMenu(menuItems, stack))
		token.set(stackMenu)
	}
}
