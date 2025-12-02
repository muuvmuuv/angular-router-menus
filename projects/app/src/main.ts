import { enableProdMode } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"

import { AppComponent } from "./app/app.component"
import { config } from "./app/app.config"
import { environment } from "./environments/environment"

if (environment.production) {
	enableProdMode()
}

bootstrapApplication(AppComponent, config).catch((error) => {
	// biome-ignore lint/suspicious/noConsole: we need this here
	console.error(error)
})
