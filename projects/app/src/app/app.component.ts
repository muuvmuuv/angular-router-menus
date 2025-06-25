import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
} from "@angular/core"
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"
import { FaIconComponent } from "@fortawesome/angular-fontawesome"
import { RouterMenusService } from "angular-router-menus"

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, RouterLink, RouterLinkActive, FaIconComponent],
})
export class AppComponent {
	readonly menu = inject(RouterMenusService).use("main")

	constructor() {
		effect(() => {
			// biome-ignore lint/suspicious/noConsole: we need this
			console.log("Menu", this.menu())
		})
	}
}
