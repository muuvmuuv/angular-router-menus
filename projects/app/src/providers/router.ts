import type { EnvironmentProviders, Provider } from "@angular/core"
import {
	provideRouter,
	withComponentInputBinding,
	withPreloading,
	withRouterConfig,
} from "@angular/router"
import type { Routes } from "@angular/router"
import { provideRouterMenus } from "angular-router-menus"

import { PreloadPreloadingStrategy } from "./preload-strategy"

export const provideAppRouter = (routes: Routes): (EnvironmentProviders | Provider)[] => [
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
		debug: true,
		defaultMenu: "main",
		menuOptions: {
			main: {
				sortOrder: "desc",
			},
		},
	}),
]
