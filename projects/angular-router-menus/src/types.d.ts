/**
 * All our menu locations.
 */
declare type Menus = string

/**
 * A menu item in a navigation context.
 */
declare interface MenuItem {
	/** In which menu this item appears. Default: `main` */
	in: Menus
	/** At which priority this item should appear in the menu. */
	priority?: number
	/** Optional label. Default: `route.title` */
	label: string
	/**
	 * The path/url for this item, it can also be overridden to
	 * support external links whereas the menu itself is a
	 * component, anything is possible.
	 */
	href: string
	/** Its children. */
	children?: MenuItem[]
}

/**
 * Different type since routes already have children which
 * we reuse. We also make anything optional here because
 * all properties have default values that are added during
 * menu building.
 */
declare type RouteMenuItem = Partial<Omit<MenuItem, "children">>

/**
 * @see {@link MenuItem}
 */
declare type MenuItems = MenuItem[]
