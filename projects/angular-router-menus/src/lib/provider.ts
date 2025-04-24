import {
	EnvironmentInjector,
	type EnvironmentProviders,
	inject,
	provideAppInitializer,
	runInInjectionContext,
} from "@angular/core"
import type { Routes } from "@angular/router"

import { buildRouterMenus } from "./builder"
import type { MenuStacks } from "./menu"
import type { RouterMenusOptions } from "./options"

export const provideRouterMenus = (
	routes: Routes,
	menuStacks: MenuStacks,
	options: RouterMenusOptions,
): EnvironmentProviders => {
	return provideAppInitializer(() => {
		const injector = inject(EnvironmentInjector)

		// We want it to be initialized at start but not block the main thread
		window.requestIdleCallback(() => {
			runInInjectionContext(injector, () => {
				void buildRouterMenus(routes, menuStacks, options).catch((error) => {
					if (options.debug) {
						// It appears that some tokens aren't ready so it will always produce errors
						// but these aren't critical to the library's functionality.
						console.error(error)
					}
				})
			})
		})
	})
}
