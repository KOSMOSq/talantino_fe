import { Box, List } from "@mui/material";
import { TalentProof } from "../../../TalentProfile/components/MainContent/components/TalentProofArea/components/TalentProof";
import { proofs } from "../../../../common/proofs";
import { Proof } from "./Proof/Proof";

const ProofsArea = () => {
    
    return (
        <Box display="flex" justifyContent="center" pt={4} width={"100%"}>
            <List>
                {proofs.map((item)=>{
                    return <Proof {...item} key={item.id}/>
                })}
            </List>
        </Box>
    )
}

export {ProofsArea};