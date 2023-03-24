import React from "react";
import { TalentCard } from "../TalentCard";
import { ChangeViewButton } from "../ChangeViewButton";
import { Box, Container, Grid, Pagination } from "@mui/material";

const Talents = () => {
	return (
		<Container sx={{ maxWidth: { xl: "1900px" } }}>
			<Box zIndex={1} position={"absolute"} right={80} mt={"15px"} mb={"15px"}>
				{/* handleChange will change view of talets */}
				<ChangeViewButton handleChange={() => 1}/>
			</Box>
			<Box display="flex" justifyContent="center" pt={4}>
				<Grid container item
					sm={12}
					md={12}
					lg={12}
					xl={12}
					spacing={2}
					display="flex"
					justifyContent="center"
				>
					{talents.map(element => {
						return (
							<Grid item key={element.id}>
								<TalentCard {...element} />
							</Grid>
						);
					})}
				</Grid>
			</Box>
			<Pagination sx={{ marginTop: "20px" }} count={125}></Pagination>
		</Container>
	);
};

export { Talents };
