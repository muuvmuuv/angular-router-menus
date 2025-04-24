import "@angular/router"

import type { RouteMenuItem } from "./lib/menu"

/**
 * Add the `menu` property to `Route`.
 */
declare module "@angular/router" {
	export interface Route {
		/**
		 * Define if route should appear in a menu.
		 */
		menu?: RouteMenuItem
	}
}
