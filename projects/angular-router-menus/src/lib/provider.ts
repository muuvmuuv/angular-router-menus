import {
	EnvironmentInjector,
	type EnvironmentProviders,
	inject,
	provideAppInitializer,
	runInInjectionContext,
} from "@angular/core"
import type { Routes } from "@angular/router"

import { buildRouterMenus, buildRouterMenus2 } from "./builder"
import type { MenuStacks } from "./menu"
import type { RouterMenusOptions } from "./options"
import { RouterMenusService } from "./service"

export const provideRouterMenus = (
	routes: Routes,
	menuStacks: MenuStacks,
	options: RouterMenusOptions,
): EnvironmentProviders => {
	return provideAppInitializer(() => {
		const injector = inject(EnvironmentInjector)

		// We want it to be initialized at start but not block the main thread
		setTimeout(() => {
			runInInjectionContext(injector, () => {
				void buildRouterMenus(routes, menuStacks, options).catch((error) => {
					if (options.debug) {
						// Some internal types might throw but it appears that these aren't
						// critical for the libraries functionality.
						console.error(error)
					}
				})
			})
		}, 10)
	})
}

export function provideRouterMenus2(
	routes: Routes,
	menus: Menus[],
	options: RouterMenusOptions,
): EnvironmentProviders {
	return provideAppInitializer(() => {
		const injector = inject(EnvironmentInjector)
		const routerMenusService = inject(RouterMenusService)

		for (const menu of menus) {
			// Must be add before async iteration happens
			routerMenusService.add(menu, [])
		}

		// We want it to be initialized at start but not block the main thread
		setTimeout(() => {
			runInInjectionContext(injector, () => {
				void buildRouterMenus2(routes, menus, options).catch((error) => {
					if (options.debug) {
						// Some internal types might throw but it appears that these aren't
						// critical for the libraries functionality.
						console.error(error)
					}
				})
			})
		}, 100)
	})
}
