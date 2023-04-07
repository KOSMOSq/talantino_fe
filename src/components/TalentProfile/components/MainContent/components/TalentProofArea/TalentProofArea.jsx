import { Box, Grid, LinearProgress } from "@mui/material";
import { TalentProof } from "./components/TalentProof";
import { proofsAPI } from "../../../../../../api/proofsAPI";
import { useState, useEffect } from "react";
import { CreateProofForm } from "../../../../../Forms/CreateProofForm/CreateProofForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TalentProofArea() {
    const [proofs, setProofs] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((store) => store.auth.token);
    const authId = useSelector((store) => store.auth.id);
    const { talentId } = useParams();
    const status = authId === Number(talentId) ? "ALL" : "PUBLISHED";
    const [isDeleted, setDeleted] = useState(false);

    useEffect(() => {
        const getProofs = async () => {
            setIsLoading(true);
            const response = await proofsAPI.getTalentProofs(
                token,
                talentId,
                undefined,
                status
            );
            setProofs(response.proofs);
            setIsLoading(false);
            setDeleted(false);
        };
        getProofs().catch((error) => console.log(error));
    }, [isDeleted]);

    if (isLoading || !proofs || isDeleted) {
        return <LinearProgress />;
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const handleDelete = async (id) => {
        // const response = await proofsAPI.deleteProof(talentId, id, token);
        // console.log(response);
        setDeleted(true);
        scrollToTop();
    };

    return (
        <>
            <Box mt={2}>
                {authId === Number(talentId) ? <CreateProofForm /> : null}
                {proofs.map((element) => {
                    console.log(element);
                    return (
                        <Grid item key={element.id}>
                            <TalentProof
                                {...element}
                                onDelete={handleDelete}
                                talentId={talentId}
                            />
                        </Grid>
                    );
                })}
            </Box>
        </>
    );
}

export { TalentProofArea };
