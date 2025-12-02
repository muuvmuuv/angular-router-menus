import type { Routes } from "@angular/router"

export const routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "home",
		title: "Home",
		loadComponent: () =>
			import("./features/home/home.component").then((m) => m.HomeFeature),
		menu: {
			in: "main", // optional
			priority: 69,
		},
	},
	{
		path: "some",
		title: "Some",
		loadComponent: () =>
			import("./features/some/some.component").then((m) => m.SomeFeature),
		preload: true,
		menu: {
			/* uses default values */
			/* and ... */
			icon: {
				name: "gem",
			},
		},
	},
] satisfies Routes
