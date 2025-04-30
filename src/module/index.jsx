import { Module } from "asab_webui_components";

import { TableScreen } from './TableScreen.jsx';
import { UserDetails } from './UserDetails.jsx';

export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule");

		app.Router.addRoute({
			path: "/",
			end: false,
			name: 'Table',
			component: TableScreen,
		});

		app.Router.addRoute({
			path: "/users/:id",
			end: true,
			name: "User details",
			component: UserDetails,
		})

		app.Navigation.addItem({
			name: "Table",
			icon: 'bi bi-table',
			url: "/",
		});
	}
}
