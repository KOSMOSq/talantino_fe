import { Container, LinearProgress, Pagination } from "@mui/material";
import { ProofsArea } from "./components/ProofsArea/ProofsArea";
import { useEffect, useState } from "react";
import { proofsAPI } from "../../api/proofsAPI";
import { useLocation } from "react-router";

const Proofs = () => {
    const [proofs, setProofs] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const getProofs = async () => {
        const response = await proofsAPI.getProofs(
            undefined,
            undefined,
            page,
            undefined
        );
        setProofs(response.proofs);
        setTotalPages(response.totalAmount);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }
        getProofs().catch(err => console.log(err));
    }, []);

    if (isLoading) {
        return <LinearProgress />;
    }

    return (
        <Container
            sx={{ width: "700px", display: "flex", flexDirection: "column" }}
        >
            <ProofsArea proofs={proofs} />
            {/* <Pagination
                sx={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: 2 }}/> */}
        </Container>
    );
};

export default Proofs;
