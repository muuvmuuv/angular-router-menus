import type { Routes } from "@angular/router"

export const routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "home",
	},
	{
		loadComponent: () => import("./features/home/home.component").then((m) => m.HomeFeature),
		menu: {
			in: "main", // optional
			priority: 69,
		},
		path: "home",
		title: "Home",
	},
	{
		loadComponent: () => import("./features/some/some.component").then((m) => m.SomeFeature),
		menu: {
			/* uses default values */
			/* and ... */
			icon: {
				name: "gem",
			},
		},
		path: "some",
		preload: true,
		title: "Some",
	},
] satisfies Routes
