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

/**
 * A menu item in a navigation context.
 *
 * @see README.md
 */
export interface MenuItem {
	/** In which menu this item appears. */
	in: Menus

	/** At which priority this item should appear in the menu. */
	priority: number

	/** Optional label. Default: `route.title` */
	label: string

	/**
	 * The path/url for this item, it can also be overridden to
	 * support external links whereas the menu itself is a
	 * component, anything is possible.
	 */
	href: string

	/** Custom menu icon. */
	icon?: {
		/** The icon name. */
		name: MenuItemIcon

		/** Icon position. */
		position?: MenuItemIconPosition
	}

	/** Its children. */
	children?: MenuItem[]
}

/**
 * Different type since routes already have children which
 * we reuse. We also make anything optional here because
 * all properties have default values that are added during
 * menu building.
 *
 * @see {@link MenuItem}
 */
export type RouteMenuItem = Partial<Omit<MenuItem, "children">>

/**
 * @see {@link MenuItem}
 */
export type MenuItems = MenuItem[]
