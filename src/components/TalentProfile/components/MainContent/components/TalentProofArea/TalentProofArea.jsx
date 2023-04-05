import { Box, Grid, Typography } from "@mui/material";
import { proofs } from "../../../../../../common/proofs";
import { TalentProof } from "./components/TalentProof";
import { CreateProofForm } from "../../../../../Forms/CreateProofForm/CreateProofForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TalentProofArea() {

	const id = useSelector(store => store.auth.id);
	const { talentId } = useParams();
	
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
				{id === Number(talentId) ? <CreateProofForm />: null}
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
