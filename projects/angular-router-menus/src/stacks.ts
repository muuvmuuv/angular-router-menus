import type { InjectionToken, WritableSignal } from "@angular/core"

/**
 * Define...
 *
 * @example
 * ```ts
 * const MENU_STACK = new InjectionToken<WritableSignal<MenuItems>>("MENU_STACK", {
 *   providedIn: "root",
 *   factory: () => signal([]),
 * })
 * const menuStacks: MenuStacks = {
 *   main: MENU_STACK,
 * }
 * ```
 */
export type MenuStacks = Record<Menus, InjectionToken<WritableSignal<MenuItems>>>
