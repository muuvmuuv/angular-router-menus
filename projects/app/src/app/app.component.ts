import { ChangeDetectionStrategy, Component, effect, inject } from "@angular/core"
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"
import { FaIconComponent } from "@fortawesome/angular-fontawesome"
import { RouterMenusService } from "angular-router-menus"

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, RouterLink, RouterLinkActive, FaIconComponent],
	selector: "app-root",
	styleUrl: "./app.component.scss",
	templateUrl: "./app.component.html",
})
export class AppComponent {
	readonly menu = inject(RouterMenusService).use("main")

	constructor() {
		effect(() => {
			console.log("Menu", this.menu())
		})
	}
}
