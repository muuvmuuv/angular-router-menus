import type { PreloadingStrategy, Route } from "@angular/router"
import { catchError, of } from "rxjs"
import type { Observable } from "rxjs"

const LOAD_TIMEOUT = 1000

export class PreloadPreloadingStrategy implements PreloadingStrategy {
	preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
		if (route.preload) {
			console.warn("Preload", route.title)

			setTimeout(() => {
				load().pipe(catchError(() => of(null)))
			}, LOAD_TIMEOUT)
		}

		if (route.loadChildren) {
			// This just loads the route not the components, but ensures that children
			// That have preload are also checked by above condition.
			return load().pipe(catchError(() => of(null)))
		}

		return of(null)
	}
}
