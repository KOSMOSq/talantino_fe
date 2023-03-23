import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../Header";

function Layout() {
	return (
		<>
			<Header />
			<Container sx={{ maxWidth: { xl: "1900px" } }}>
				<Outlet />
			</Container>
		</>
	);
}

export { Layout };
