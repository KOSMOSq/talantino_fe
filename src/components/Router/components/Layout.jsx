import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../Header/Header";
import { Container } from "@mui/material";

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
