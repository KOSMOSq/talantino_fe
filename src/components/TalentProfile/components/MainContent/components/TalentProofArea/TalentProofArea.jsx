import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import { TalentProof } from "./components/TalentProof";
import { CreateProofForm } from "../../../../../Forms/CreateProofForm/CreateProofForm";
import { useDispatch, useSelector } from "react-redux";
import {
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";
import {
    deleteTalentProofThunk,
    getTalentProofsThunk,
    setStatus,
    setTalentProofs
} from "../../../../../../redux/reducers/talentsProofsReducer";
import { useEffect, useState } from "react";

function TalentProofArea() {
    const STATUSES = ["ALL", "PUBLISHED", "HIDDEN", "DRAFT"];

    const [page, setPage] = useState(0);

    const dispatch = useDispatch();
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
            getTalentProofsThunk(talentId, "date", status, "desc", page, 5)
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
            authId === Number(talentId)
        ) {
            statusParam = urlStatusParam;
        } else if (authId === Number(talentId)) {
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
                5,
                true
            )
        );
        setPage(prev => 1);
    }, [searchParams.get("status")]);

    return (
        <>
            <Box mt={2}>
                {authId === Number(talentId) ? (
                    <>
                        <CreateProofForm />
                        <Box mb={2}>
                            <FormControl sx={{ width: "120px" }}>
                                <InputLabel id="selectStatus">
                                    Status
                                </InputLabel>
                                <Select
                                    labelId="selectStatus"
                                    label="Status"
                                    value={status}
                                    onChange={handleChange}
                                    sx={{ height: "40px" }}
                                >
                                    <MenuItem value={"ALL"}>All</MenuItem>
                                    <MenuItem value={"PUBLISHED"}>
                                        Published
                                    </MenuItem>
                                    <MenuItem value={"HIDDEN"}>Hidden</MenuItem>
                                    <MenuItem value={"DRAFT"}>Draft</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                ) : null}
                {proofs.length === 0 && !isLoading ? <Typography varitant="caption" sx={{ color: "gray" }} align="center">No proofs yet!</Typography> : proofs.map(element => {
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
                <Box
                    sx={{ width: "100%" }}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                >
                    {isLoading || !proofs ? (
                        <CircularProgress
                            size={60}
                            sx={{ marginLeft: "auto", marginRight: "auto" }}
                        />
                    ) : null}
                    {!(totalPages <= page) ? (
                        <Button onClick={handleClick}>Get more proofs</Button>
                    ) : null}
                </Box>
            </Box>
        </>
    );
}

export { TalentProofArea };
