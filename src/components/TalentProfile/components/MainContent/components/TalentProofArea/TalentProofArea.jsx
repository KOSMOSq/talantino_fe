import { Box, Grid, Typography } from "@mui/material";
import { proofs } from "../../../../../../common/proofs";
import { TalentProof } from "./components/TalentProof";

function TalentProofArea() {
	return (
		<>
			<Box>
				<Typography
					variant="h5"
					component="h5"
					mt={2}
					mb={2}
					sx={{ fontWeight: "bold" }}
				>
					Proofs
				</Typography>
				{proofs.map((element) => {
					return (
						<Grid item key={element.id}>
							<TalentProof {...element} />
						</Grid>
					);
				})}
			</Box>
		</>
	);
}

export { TalentProofArea };
