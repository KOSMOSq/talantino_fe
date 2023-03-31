import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../Header";

function Layout() {
	return (
		<>
			<Header />
			<Box sx={{ maxWidth: { xl: "1900px" } }}>
				<Outlet />
			</Box>
		</>
	);
}

export { Layout };
