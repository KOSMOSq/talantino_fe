import { Box, List } from "@mui/material";
import { Proof } from "./Proof/Proof";

const ProofsArea = ({ proofs }) => {
    return (
        <Box display="flex" justifyContent="center" pt={2} width={"100%"}>
            <List>
                {proofs.map(item => {
                    return <Proof {...item} key={item.id} />;
                })}
            </List>
        </Box>
    );
};

export { ProofsArea };
