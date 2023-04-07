import { Box, Grid, LinearProgress } from "@mui/material";
import { TalentProof } from "./components/TalentProof";
import { useEffect, useState } from "react";
import { CreateProofForm } from "../../../../../Forms/CreateProofForm/CreateProofForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    deleteTalentProofThunk,
    getTalentProofsThunk,
    setTalentProofs,
} from "../../../../../../redux/reducers/proofsReducer";
import InfiniteScroll from "react-infinite-scroll-component";

function TalentProofArea() {
    const authId = useSelector((store) => store.auth.id);
    const { talentId } = useParams();
    const proofs = useSelector((store) => store.proofs.talentProofs);
    const token = useSelector((store) => store.auth.token);
    const totalPages = useSelector((store) => store.proofs.totalTalentPages);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();

    const fetchMoreData = () => {
        dispatch(
            getTalentProofsThunk(
                talentId,
                "date",
                talentId === authId ? "ALL" : "PUBLISHED",
                "desc",
                currentPage,
                5
            )
        );
        setCurrentPage((prev) => prev + 1);
    };

    useEffect(() => {
        dispatch(setTalentProofs([]));
        setCurrentPage((prev) => 0);
        fetchMoreData();
    }, [talentId]);

    // add isLoading dep, proofs is an array so it is always true
    if (!proofs) {
        return <LinearProgress />;
    }

    const handleDelete = async (id) => {
        dispatch(deleteTalentProofThunk(id));
    };

    return (
        <>
            <Box mt={2}>
                {authId === Number(talentId) ? <CreateProofForm /> : null}
                {/* improve loader and end message */}
                <InfiniteScroll
                    dataLength={proofs.length}
                    next={fetchMoreData}
                    hasMore={totalPages - 1 >= currentPage}
                    loader={<h1>loading...</h1>}
                    endMessage={<h1>You ve reached the end</h1>}
                >
                    {proofs.map((element) => {
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
                </InfiniteScroll>
            </Box>
        </>
    );
}

export { TalentProofArea };
