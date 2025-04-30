import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import { Application, I18nModule, AboutModule, TenantModule } from 'asab_webui_shell';

(async function init() {
	// Dynamically import your module(s)
	const { default: TableApplicationModule } = await import('./module/index.jsx');

	const config = {
		title: "TeskaLabs Training UI App",
		website: "https://teskalabs.com",
		email: "info@teskalabs.com",
		brandImage: {
			light: {
				full: "media/logo/sidebar-logo-full.svg",
				minimized: "media/logo/sidebar-logo-minimized.svg",
			},
			dark: {
				full: "media/logo/sidebar-logo-full-dark.svg",
				minimized: "media/logo/sidebar-logo-minimized-dark.svg"
			}
		},
		sidebarLogo: {
			dark: {
				full: "media/logo/sidebar-logo-full-dark.svg",
				minimized: "media/logo/sidebar-logo-minimized-dark.svg"
			},
			light: {
				full: "media/logo/sidebar-logo-full.svg",
				minimized: "media/logo/sidebar-logo-minimized.svg"
			}
		},
		i18n: {
			fallbackLng: 'en',
			supportedLngs: ['en', 'cs'],
			debug: false,
			nsSeparator: false
		},
		tenants: [
			'teskaLabs'
		],
		defaultTenant: 'teskaLabs'
	};

	ReactDOM.render((
		<HashRouter>
			<Application
				configdefaults={config}
				modules={[TenantModule, I18nModule, AboutModule, TableApplicationModule]}
			/>
		</HashRouter>
	), document.getElementById('app'));
})();
