import { Box, Grid } from "@mui/material";
import { TalentProof } from "./components/TalentProof";
import { CreateProofForm } from "../../../../../Forms/CreateProofForm/CreateProofForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    deleteTalentProofThunk,
    getTalentProofsThunk,
    setStatus,
    setTalentProofs
} from "../../../../../../redux/reducers/talentsProofsReducer";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { EndMessage } from "./components/EndMessage/EndMessage";
import { StatusSelect } from "./components/StatusSelect/StatusSelect";

function TalentProofArea() {
    const STATUSES = ["ALL", "PUBLISHED", "HIDDEN", "DRAFT"];
    const AMOUNT = 10;

    const [page, setPage] = useState(0);

    const dispatch = useDispatch();
    const role = useSelector(store => store.auth.user.role);
    const authId = useSelector(store => store.auth.user.id);
    const proofs = useSelector(store => store.talentProofs.talentProofs);
    const status = useSelector(store => store.talentProofs.status);
    const totalPages = useSelector(store => store.talentProofs.totalPages);
    const isLoading = useSelector(store => store.talentProofs.isLoading);

    const navigate = useNavigate();
    const { talentId } = useParams();
    const [searchParams] = useSearchParams();

    const handleChange = event => {
        dispatch(setStatus(event.target.value));
        navigate(`?status=${event.target.value}`);
    };

    const handleDelete = async id => {
        setPage(1);
        dispatch(deleteTalentProofThunk(id));
    };

    const handleClick = () => {
        dispatch(
            getTalentProofsThunk(talentId, "date", status, "desc", page, AMOUNT)
        );
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        dispatch(setTalentProofs([]));
        const urlStatusParam = searchParams.get("status");
        let statusParam = null;
        if (
            urlStatusParam &&
            STATUSES.includes(urlStatusParam) &&
            authId === Number(talentId) &&
            role === "TALENT"
        ) {
            statusParam = urlStatusParam;
        } else if (authId === Number(talentId) && role === "TALENT") {
            statusParam = "ALL";
        } else {
            statusParam = "PUBLISHED";
        }
        dispatch(setStatus(statusParam));
        dispatch(
            getTalentProofsThunk(
                talentId,
                "date",
                statusParam,
                "desc",
                0,
                AMOUNT,
                true
            )
        );
        setPage(prev => 1);
    }, [searchParams.get("status")]);

    return (
        <>
            <Box mt={2}>
                {authId === Number(talentId) && role === "TALENT" ? (
                    <>
                        <CreateProofForm />
                        <StatusSelect
                            status={status}
                            handleChange={handleChange}
                        />
                    </>
                ) : null}
                <Box sx={{ width: "100%" }}>
                    <InfiniteScroll
                        dataLength={proofs.length}
                        next={handleClick}
                        hasMore={page < totalPages}
                    >
                        {proofs.map(element => {
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
                    <EndMessage
                        handleClick={handleClick}
                        proofs={proofs}
                        isLoading={isLoading}
                        page={page}
                        totalPages={totalPages}
                    />
                </Box>
            </Box>
        </>
    );
}

export { TalentProofArea };
