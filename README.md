# Angular Router Menus

Simplify your Angular applications navigation by defining menu entries directly at the route itself. It is fully typed and defined by your requirements, build as many navigation's as you like. It also supports nesting menus so you can build yourself cool dropdowns. All menus are build and injected into several injection tokens, so you can import them anywhere.

```shell
pnpm add angular-router-menus
```

> [!TIP]
> Zero dependencies and no performance bottleneck!

- [Installation](#installation)
  - [`menus.ts`](#menusts)
  - [`main.ts`](#maints)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Menu](#menu)
- [Examples](#examples)

## Installation

1. Install the package
2. Add these entries to your tsconfig.json of your application
   - `angular-router-menus`: This ensures you have all required types globally
   - `angular-router-menus/angular`: This patches Angular's Route(r) type with a new entry
3. Create a type definition file and add this line
   1. `declare type Menus = "main"`
   2. Adjust menus by your needs, you will configure them later
4. Create a [`menus.ts`](#menusts) file, this will hold your `Menus` stack injection tokens
5. In your [`main.ts`](#maints) file import and configure the library [as described](#maints) below
   - A preloading strategy is required for it to work correctly

### `menus.ts`

```typescript
import { InjectionToken, type WritableSignal, signal } from "@angular/core";

import type { MenuItems, MenuStacks } from "angular-router-menus";

export const MENU_STACK = new InjectionToken<WritableSignal<MenuItems>>("MENU_STACK", {
	providedIn: "root",
	factory: () => signal([]),
});

export const menus: MenuStacks = {
	main: MENU_STACK,
};
```

### `main.ts`

```typescript
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";

import { provideRouterMenus } from "angular-router-menus";

import { AppComponent } from "./app/app.component";
import { menus } from "./menus";
import { routes } from "./routes";

void bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(routes, withPreloading(NoPreloading)),
		provideRouterMenus(routes, menus, {
			defaultMenu: "main", // 👋🏻
			debug: false,
		}),
	],
}).catch((error) => {
	console.error(error);
});
```

## Usage

```typescript
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

import { MENU_STACK } from "../menus";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
	readonly menu = inject(MENU_STACK); // 👋🏻
}
```

```html
<ul>
	@for (item of menu(); track item.href) {
	<li>
		<a [routerLink]="item.href" routerLinkActive="active">{{ item.label }}</a>
	</li>
	}
</ul>
```

## Configuration

For details on menu items configuration, please take a look at the interfaces and its documentation here: [projects/angular-router-menus/src/lib/menu.ts](...)

| Property      | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `defaultMenu` | If not defined via `in` this is the default menu.                                                  |
| `debug`       | Set debugging otherwise nothing si thrown to prevent internal api's from telling to much nonsense. |

### Menu

## Examples

For an example go to projects/app and run it :)
