import { type EnvironmentProviders, provideAppInitializer } from "@angular/core"
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
		// We want it to be initialized at start but not block the main thread
		window.requestIdleCallback(() => {
			void buildRouterMenus(routes, menuStacks, options).catch((error) => {
				console.error(error)
			})
		})
	})
}
