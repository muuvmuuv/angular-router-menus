import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
	selector: "app-feature-some",
	templateUrl: "./some.component.html",
	styleUrl: "./some.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SomeFeature {}
