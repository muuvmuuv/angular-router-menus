/**
 * We add some specials to the router by our router strategy.
 */
declare module "@angular/router" {
	interface Route {
		/**
		 * Mark this component as preloadable. Default: `false`
		 */
		preload?: boolean
	}
}

export {}
