import { provideHttpClient, withFetch } from "@angular/common/http"
import {
	type ApplicationConfig,
	mergeApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from "@angular/core"
import { provideAppRouter } from "src/providers/router"

import { provideIcons } from "../providers/icons"
import { routes } from "./app.routes"

const clientConfig = {
	providers: [provideAppRouter(routes)],
} satisfies ApplicationConfig

export const config = mergeApplicationConfig(
	{
		providers: [
			provideZonelessChangeDetection(),
			provideBrowserGlobalErrorListeners(),
			provideHttpClient(withFetch()),
			provideIcons(),
		],
	},
	clientConfig,
)
