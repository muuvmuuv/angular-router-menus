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

import { provideRouterMenus } from "angular-router-menus"

import { AppComponent } from "./app/app.component"
import { environment } from "./environments/environment"
import { provideIcons } from "./icons"
import { routes } from "./routes"

if (environment.production) {
	enableProdMode()
}

void bootstrapApplication(AppComponent, {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withPreloading(NoPreloading), withComponentInputBinding()),
		provideRouterMenus(routes, ["main", "aside"], {
			defaultMenu: "main",
			debug: !environment.production,
			menuOptions: {
				main: {
					sortOrder: "desc",
				},
			},
		}),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
		provideIcons(),
	],
}).catch((error) => {
	console.error(error)
})
