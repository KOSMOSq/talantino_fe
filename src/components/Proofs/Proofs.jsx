import { Container, Pagination } from "@mui/material";
import { ProofsArea } from "./components/ProofsArea/ProofsArea";
import { useEffect, useState } from "react";
import { proofsAPI } from "../../api/proofsAPI";
import { useLocation } from "react-router";

const Proofs = () => {
    const [proofs, setProofs] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getProofs = async () => {
        const response = await proofsAPI.getProofs();
        setProofs(response);
    };

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }

        setIsLoading(false);
    }, []);

    return (
        <Container
            sx={{ width: "700px", display: "flex", flexDirection: "column" }}
        >
            <ProofsArea />
            {/* <Pagination
                sx={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: 2 }}/> */}
        </Container>
    );
};

export default Proofs;
