import type { EnvironmentProviders, Provider } from "@angular/core"
import {
	provideRouter,
	type Routes,
	withComponentInputBinding,
	withPreloading,
	withRouterConfig,
} from "@angular/router"
import { provideRouterMenus } from "angular-router-menus"

import { PreloadPreloadingStrategy } from "./preload-strategy"

export const provideAppRouter = (
	routes: Routes,
): (EnvironmentProviders | Provider)[] => {
	return [
		PreloadPreloadingStrategy,
		provideRouter(
			routes,
			withComponentInputBinding(),
			withPreloading(PreloadPreloadingStrategy),
			withRouterConfig({
				paramsInheritanceStrategy: "always",
			}),
		),
		provideRouterMenus(routes, ["main", "aside"], {
			defaultMenu: "main",
			debug: true,
			menuOptions: {
				main: {
					sortOrder: "desc",
				},
			},
		}),
	]
}
