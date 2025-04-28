import { Injectable, type WritableSignal, signal } from "@angular/core"
import type { MenuItems } from "./menu"

@Injectable({
	providedIn: "root",
})
export class RouterMenusService {
	#menus = new Map<Menus, WritableSignal<MenuItems>>()

	add(menu: Menus, items: MenuItems): void {
		let _menu = this.#menus.get(menu)
		if (_menu) {
			throw new Error("Cannot add menu twice")
		}
		_menu = signal<MenuItems>(items)
		this.#menus.set(menu, _menu)
	}

	use(menu: Menus): WritableSignal<MenuItems> {
		const _menu = this.#menus.get(menu)
		if (!_menu) {
			throw new Error("Menu not found")
		}
		return _menu
	}
}
