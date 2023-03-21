import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../Header/Header";

function Layout() {
	return (
		<>
			<Header />

			<div className="main">
				<Outlet />
			</div>

			<footer>footer</footer>
		</>
	);
}

export { Layout };
