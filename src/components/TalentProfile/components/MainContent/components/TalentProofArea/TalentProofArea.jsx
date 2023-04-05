import { Box, Grid, LinearProgress, Typography } from "@mui/material";
//import { proofs } from "../../../../../../common/proofs";
import { TalentProof } from "./components/TalentProof";
import { proofsAPI } from "../../../../../../api/proofsAPI";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TalentProofArea() {
	const [proofs, setProofs] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const token = useSelector(store => store.auth.token);
	const id = useSelector(store => store.auth.id);
	const {talentId} = useParams();
	const status = id === Number(talentId) ? "ALL" : "PUBLISHED";
	
	useEffect(()=>{
		const getProofs = async () =>{
			setIsLoading(true);
			const response = await proofsAPI.getTalentProofs(token, talentId, undefined, status);
			setProofs(response.proofs);
			setIsLoading(false);
		}
		getProofs().catch((error) => console.log(error));
	},[])

	if (isLoading || !proofs) {
		return <LinearProgress />;
	}

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
