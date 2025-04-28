import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"

import { RouterMenusService } from "angular-router-menus"
import { MENU_STACK } from "../menus"

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
	readonly menu = inject(MENU_STACK)
	readonly menu2 = inject(RouterMenusService).use("main")
}
