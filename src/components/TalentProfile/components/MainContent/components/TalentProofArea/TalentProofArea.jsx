import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { TalentProof } from "./components/TalentProof";
import { CreateProofForm } from "../../../../../Forms/CreateProofForm/CreateProofForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTalentProofThunk } from "../../../../../../redux/reducers/talentsProofsReducer";

function TalentProofArea() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authId = useSelector(store => store.auth.id);
    const proofs = useSelector(store => store.talentProofs.talentProofs);
    const { talentId } = useParams();

    const handleChange = event => {
        navigate(`?status=${event.target.value}`);
    };

    const handleMoreDate = () => {};

    const handleDelete = async id => {
        dispatch(deleteTalentProofThunk(id));
    };

    const fetchMoreData = async () => {};

    return (
        <>
            <Box mt={2}>
                {authId === Number(talentId) ? <CreateProofForm /> : null}
                <Box mb={2}>
                    <FormControl sx={{ width: "120px" }}>
                        <InputLabel id="selectStatus">Status</InputLabel>
                        <Select
                            labelId="selectStatus"
                            value={"ALL"}
                            // value={status}
                            onChange={handleChange}
                        >
                            <MenuItem value={"ALL"}>All</MenuItem>
                            <MenuItem value={"PUBLISHED"}>Published</MenuItem>
                            <MenuItem value={"HIDDEN"}>Hidden</MenuItem>
                            <MenuItem value={"DRAFT"}>Draft</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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
                <Button onClick={handleMoreDate}>Get more data</Button>
            </Box>
        </>
    );
}

export { TalentProofArea };
