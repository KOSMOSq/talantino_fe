import { Container, Pagination } from "@mui/material"
import { ProofsArea } from "./components/ProofsArea/ProofsArea";

const Proofs = () => {
    return (
        <Container  sx={{ width: "700px", display: "flex", flexDirection: "column" }}>
            <ProofsArea />
            <Pagination
                sx={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: 2 }}/>
        </Container>
    );
};

export default Proofs; 