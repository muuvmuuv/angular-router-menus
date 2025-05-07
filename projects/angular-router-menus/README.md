# Angular Router Menus

Simplify your Angular applications navigation by defining menu entries directly at the route itself. It is fully typed and defined by your requirements, build as many navigation's as you like. It also supports nesting menus so you can build yourself cool dropdowns. All menus are build and injected into several injection tokens, so you can import them anywhere.

```shell
pnpm add angular-router-menus
```

> [!TIP]
> Zero dependencies and no performance bottleneck!

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [MenuOptions](#menuoptions)
- [Examples](#examples)

## Installation

1. Install the package
2. Create a type definition file or add to yours
   1. `declare type Menus = "main" | "aside"`
   2. Adjust menus by your needs, you will configure them later
3. In your [`main.ts`](#maints) file import and configure the library
4. Make sure you have all your declared menus in the menus array
5. You must need a preloading strategy because I use internal api's
   - `NoPreloading` is the default in Angular

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
	</li>
	}
</ul>
```

## Configuration

For details on menu items configuration, please take a look at the interfaces and its documentation here: [projects/angular-router-menus/src/lib/menu.ts](...)

| Property      | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `defaultMenu` | If not defined via `in` this is the default menu.                          |
| `debug`       | Enables debugging, because of internal API use I omit all errors.          |
| `menuOptions` | Object of menu name and an object. Please see [MenuOptions](#menuoptions). |

### MenuOptions

| Property    | Description                   |
| ----------- | ----------------------------- |
| `sortOrder` | Sort menu by "asc" or "desc". |

## Examples

For an example go to projects/app and run it :)
