import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { ChangeViewButton } from "../ChangeViewButton";
import { testTalents } from "../../common/common";
import { TalentCard } from "../TalentCard";

function Talents() {

	return (
		<Container >
			<Box zIndex={1} position={"absolute"} right={80} mt={"15px"} mb={"15px"}>
				{/* handleChange will change view of talets */}
				<ChangeViewButton handleChange={() => 1}/>
			</Box>

			<Box display="flex" justifyContent="center" pt={4}>
				<Grid container item 
					sm={12}
					spacing={2}
					display="flex"
					justifyContent="center">
					
					{/* testTalents will become a state that will contain an elements from server */}
					{testTalents.map((element, index) => {
						return (
							<Grid item key = {element.id}>
								<TalentCard {...element} />
							</Grid>
						)
					})}
				</Grid>
			</Box>
		</Container>
	)
}

export { Talents };