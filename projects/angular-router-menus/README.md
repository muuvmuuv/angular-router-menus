# Angular Router Menus

Simplify your Angular applications navigation by defining menu entries directly at the route itself. It is fully typed and defined by your requirements, build as many navigation's as you like. It also supports nesting menus so you can build yourself cool dropdowns. All menus are build and injected into several injection tokens, so you can import them anywhere.

```shell
pnpm add angular-router-menus
```

> [!TIP]
> Zero dependencies and no performance bottleneck!

- [Installation](#installation)
- [Configuration](#configuration)
  - [MenuOptions](#menuoptions)
  - [MenuItem](#menuitem)
- [Types](#types)
- [Usage](#usage)
- [Examples](#examples)
- [FAQ](#faq)
  - [How can I show a different icon when it is an external href?](#how-can-i-show-a-different-icon-when-it-is-an-external-href)

## Installation

1. Install the package
2. Create a [type definition file](#types) or add to yours
   1. `declare type Menus = "main" | "aside"`
   2. Adjust these menus by your needs
3. In your [`main.ts`](#maints) file import and configure the library
4. You must need a preloading strategy because I use internal api's which require some providers
   - `NoPreloading` is the default in Angular
5. Add a `menu` property to each Angular route where you want it to appear in the default menu
6. Use the `menu.in` property to define in which menu the route should appear
7. [Configure](#configuration) even more!

```typescript
void bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(routes, withPreloading(NoPreloading)),
		provideRouterMenus(routes, ["main"], {
			defaultMenu: "main", // 👋🏻
			debug: !environment.production,
		}),
	],
}).catch((error) => {
	console.error(error);
});
```

```typescript
export const routes = [
	{
		path: "home",
		title: "Home",
		loadComponent: /* ... */,
		menu: {
			in: "main",
		},
	}
] satisfies Routes
```

## Configuration

For details on menu items configuration, please take a look at the interfaces and its documentation here: [projects/angular-router-menus/src/lib/menu.ts](...)

| Property      | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `defaultMenu` | If not defined via `in` this is the default menu.                          |
| `debug`       | Enables debugging, because of internal API use I omit all errors.          |
| `menuOptions` | Object of menu name and an object. Please see [MenuOptions](#menuoptions). |

### MenuOptions

Define options for a specific menu.

| Property    | Description                   |
| ----------- | ----------------------------- |
| `sortOrder` | Sort menu by "asc" or "desc". |

### MenuItem

| Property        | Description                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `in`            | In which menu this item appears.                                                                                             |
| `priority`      | At which priority this item should appear in the menu.                                                                       |
| `label`         | Optional label. Default: `route.title`.                                                                                      |
| `href`          | Change default route url to something else. For example to redirect to an external site. This also works on component pages. |
| `icon.name`     | A menu item icon.                                                                                                            |
| `icon.position` | Its position. Define it by yourself.                                                                                         |

## Types

All types by `angular-router-menus` are by default very wide (e.g. `string`), to use your own custom types, you can override the declarations by defining your types in e.g. a `arm-types.d.ts` file.

Here is an example which also uses Angular-FontAwesome (see `./projects/app/src/icons.ts` for more) icon names for the menu item icon property so it will autocomplete in your IDE/Editor.

```typescript
declare type Menus = "main" | "aside";
declare type MenuItemIcon = import("@fortawesome/fontawesome-common-types").IconName;
declare type MenuItemIconPosition = "left" | "right";
```

## Usage

```typescript
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
	readonly menu = inject(RouterMenusService).use("main"); // 👋🏻
}
```

```html
<ul>
	@for (item of menu(); track item.href) {
	<li>
		<a [routerLink]="item.href" routerLinkActive="active">{{ item.label }}</a>
		@if (item.icon) {
		<fa-icon [icon]="item.icon.name" />
		}
	</li>
	} @empty {
	<span>Loading...</span>
	}
</ul>
```

## Examples

For a full example project go to `projects/app/` and run it ;), it uses:

- Angular FontAwesome
- Tailwind
- Most of the lib's options
- Zoneless

## FAQ

### How can I show a different icon when it is an external href?

You can use a if-clause and pipe to check for the href to start with "http" or use some lib to check against it. In later Angular version you can also directly call `"...".startsWith("http")`.
