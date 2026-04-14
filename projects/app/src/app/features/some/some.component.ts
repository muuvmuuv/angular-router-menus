import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: "app-feature-some",
	styleUrl: "./some.component.scss",
	templateUrl: "./some.component.html",
})
export class SomeFeature {}
