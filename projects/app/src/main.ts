import { provideHttpClient, withFetch } from "@angular/common/http"
import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import {
	NoPreloading,
	provideRouter,
	withComponentInputBinding,
	withPreloading,
} from "@angular/router"

import { provideRouterMenus } from "angular-router-menus"

import { AppComponent } from "./app/app.component"
import { environment } from "./environments/environment"
import { menus } from "./menus"
import { routes } from "./routes"

void bootstrapApplication(AppComponent, {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withPreloading(NoPreloading), withComponentInputBinding()),
		provideRouterMenus(routes, menus, {
			defaultMenu: "main",
			debug: !environment.production,
		}),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
	],
}).catch((error) => {
	console.error(error)
})
