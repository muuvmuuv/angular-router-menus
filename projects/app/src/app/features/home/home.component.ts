import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: "app-feature-home",
	styleUrl: "./home.component.scss",
	templateUrl: "./home.component.html",
})
export class HomeFeature {}
