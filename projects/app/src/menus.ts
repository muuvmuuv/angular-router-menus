import { InjectionToken, type WritableSignal, signal } from "@angular/core"

import type { MenuItems, MenuStacks } from "angular-router-menus"

export const MENU_STACK = new InjectionToken<WritableSignal<MenuItems>>("MENU_STACK", {
	providedIn: "root",
	factory: () => signal([]),
})

export const menus: MenuStacks = {
	main: MENU_STACK,
}
