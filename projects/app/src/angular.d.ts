/**
 * We add some specials to the router by our router strategy.
 */
export module "@angular/router" {
	interface Route {
		/**
		 * Mark this component as preloadable. Default: `false`
		 */
		preload?: boolean
	}
}
