/**
 * Registration timeout for idle handler.
 */
export const REGISTRATION_TIMEOUT = 333

/**
 * Menu sort orders
 */
export type MenuSortOrder = "desc" | "asc"

/**
 * Options for a menu.
 */
export interface MenuOptions {
	/**
	 * Menu sort order from left to right or
	 * top to bottom. Default: `asc`
	 *
	 * - asc:  0 1 2 3
	 * - desc: 3 2 1 0
	 */
	sortOrder?: MenuSortOrder
}

/**
 * Router menus options.
 */
export interface RouterMenusOptions {
	defaultMenu: Menus
	debug?: boolean
	menuOptions?: Partial<Record<Menus, MenuOptions>>
}
