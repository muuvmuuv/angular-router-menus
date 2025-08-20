import {
	EnvironmentInjector,
	type EnvironmentProviders,
	inject,
	provideAppInitializer,
	runInInjectionContext,
} from "@angular/core"
import type { Routes } from "@angular/router"

import { buildRouterMenus } from "./builder"
import { REGISTRATION_TIMEOUT, type RouterMenusOptions } from "./options"
import { RouterMenusService } from "./service"

export function provideRouterMenus(
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
		const initializeMenus = () => {
			runInInjectionContext(injector, () => {
				buildRouterMenus(routes, menus, options).catch((error) => {
					if (options.debug) {
						// Some internal types might throw but it appears that these aren't
						// critical for the libraries functionality.
						// biome-ignore lint/suspicious/noConsole: we need this information here
						console.error(error)
					}
				})
			})
		}

		if (typeof requestIdleCallback !== "undefined") {
			requestIdleCallback(initializeMenus, { timeout: REGISTRATION_TIMEOUT })
		} else {
			// Fallback for environments without requestIdleCallback
			if (options.debug) {
				// biome-ignore lint/suspicious/noConsole: we must inform for debugging
				console.warn("Fallback to setTimeout, no requestIdleCallback available")
			}
			setTimeout(initializeMenus, REGISTRATION_TIMEOUT)
		}
	})
}
