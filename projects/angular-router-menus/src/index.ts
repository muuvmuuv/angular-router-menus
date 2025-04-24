import { type EnvironmentProviders, provideAppInitializer } from "@angular/core"
import type { Routes } from "@angular/router"

import { buildRouterMenus } from "./builder"
import type { RouterMenusOptions } from "./options"
import type { MenuStacks } from "./stacks"

export const provideRouterMenus = (
	routes: Routes,
	menuStacks: MenuStacks,
	options: RouterMenusOptions,
): EnvironmentProviders => {
	return provideAppInitializer(() => {
		void buildRouterMenus(routes, menuStacks, options)
	})
}
