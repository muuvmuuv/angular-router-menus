import { type EnvironmentProviders, inject, provideAppInitializer } from "@angular/core"
import { FaConfig, FaIconLibrary } from "@fortawesome/angular-fontawesome"

export function provideIcons(): EnvironmentProviders {
	return provideAppInitializer(async () => {
		const library = inject(FaIconLibrary)
		const config = inject(FaConfig)

		config.defaultPrefix = "far"
		config.fixedWidth = true

		const { far } = await import("@fortawesome/free-regular-svg-icons")

		library.addIconPacks(far)
	})
}
