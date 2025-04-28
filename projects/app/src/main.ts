import { provideHttpClient, withFetch } from "@angular/common/http"
import { enableProdMode, provideExperimentalZonelessChangeDetection } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import {
	NoPreloading,
	provideRouter,
	withComponentInputBinding,
	withPreloading,
} from "@angular/router"

import { provideRouterMenus, provideRouterMenus2 } from "angular-router-menus"

import { AppComponent } from "./app/app.component"
import { environment } from "./environments/environment"
import { menus } from "./menus"
import { routes } from "./routes"

if (environment.production) {
	enableProdMode()
}

void bootstrapApplication(AppComponent, {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withPreloading(NoPreloading), withComponentInputBinding()),
		provideRouterMenus(routes, menus, {
			// v1
			defaultMenu: "main",
			debug: !environment.production,
		}),
		provideRouterMenus2(routes, ["main"], {
			// v2
			defaultMenu: "main",
			debug: !environment.production,
		}),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
	],
}).catch((error) => {
	console.error(error)
})
