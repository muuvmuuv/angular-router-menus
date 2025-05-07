import { Injectable, type WritableSignal, signal } from "@angular/core"
import type { MenuItems } from "./menu"

@Injectable({
	providedIn: "root",
})
export class RouterMenusService {
	#menus = new Map<Menus, WritableSignal<MenuItems>>()

	add(menu: Menus, items: MenuItems): void {
		if (this.#menus.has(menu)) {
			throw new Error("Cannot add menu twice")
		}
		this.#menus.set(menu, signal<MenuItems>(items))
	}

	use(menu: Menus): WritableSignal<MenuItems> {
		const _menu = this.#menus.get(menu)
		if (!_menu) {
			throw new Error("Menu not found")
		}
		return _menu
	}
}
