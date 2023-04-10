import { Container, LinearProgress, Pagination } from "@mui/material";
import { ProofsArea } from "./components/ProofsArea/ProofsArea";
import { useEffect, useState } from "react";
import { proofsAPI } from "../../api/proofsAPI";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const Proofs = () => {
    const [proofs, setProofs] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const getProofs = async (page, count) => {
        const response = await proofsAPI.getProofs(
            undefined,
            undefined,
            page - 1,
            count
        );
        const total = Math.ceil(response.totalAmount / count);
        setTotalPages(total);

        if (page > total) {
            setPage(total);
            navigate(`/proofs?page=${total}`);
            return;
        }

        setProofs(response.proofs);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }
        const urlPage = Number(searchParams.get("page")) || 1;
        setPage(urlPage);
        if (page < 1) {
            setPage(1);
            navigate(`/proofs?page=1`);
            return;
        }

        getProofs(page, 9).catch(err => console.log(err));
    }, [page]);

    if (isLoading) {
        return <LinearProgress />;
    }

    const handleChange = (e, value) => {
        setPage(value);
        navigate(`/proofs?page=${value}`);
    };

    return (
        <Container
            sx={{ width: "700px", display: "flex", flexDirection: "column" }}
        >
            <ProofsArea proofs={proofs} />
            <Pagination
                sx={{
                    marginTop: 1,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 4
                }}
                page={page}
                count={totalPages}
                onChange={handleChange}
            />
        </Container>
    );
};

export default Proofs;
