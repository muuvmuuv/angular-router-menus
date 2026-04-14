import { provideHttpClient, withFetch } from "@angular/common/http"
import {
	mergeApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from "@angular/core"
import type { ApplicationConfig } from "@angular/core"

import { provideIcons } from "../providers/icons"
import { provideAppRouter } from "../providers/router"
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
