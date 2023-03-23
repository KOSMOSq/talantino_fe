import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../Header";

function Layout() {
	return (
		<>
			<Header />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}

export { Layout };
