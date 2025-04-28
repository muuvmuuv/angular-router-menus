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
			import("./app/features/home/home.component").then((m) => m.HomeFeature),
		menu: {
			in: "main", // optional
		},
	},
	{
		path: "some",
		title: "Some",
		loadComponent: () =>
			import("./app/features/some/some.component").then((m) => m.SomeFeature),
		menu: {},
	},
] satisfies Routes
