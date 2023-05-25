import { Box, List, FormControl, Select, MenuItem } from "@mui/material";
import { Proof } from "./Proof/Proof";
import { useSelector, useDispatch } from "react-redux";
import { setProofsSortType } from "../../../../redux/reducers/proofsReducer";
import { useLocation, useNavigate } from "react-router-dom";

const ProofsArea = ({ proofs, isLoading }) => {
    const sortType = useSelector(store => store.proofs.proofsSortType);
    const page = useSelector(store => store.proofs.currentPage);
    //const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = event => {
        // dispatch(setProofsSortType(event.target.value));
        console.log(event.target.value);
        navigate(`/proofs?page=${page}&filter=${event.target.value}`);
    };

    if (proofs.length === 0) {
        proofs = Array(9).fill({});
    }

    return (
        <>
            <Box mt={"15px"}>
                <FormControl sx={{ width: "120px" }}>
                    <Select
                        sx={{ height: "40px" }}
                        variant="outlined"
                        labelId="sortType"
                        id="selectSortType"
                        value={sortType}
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        <MenuItem value={"desc"}>Newest</MenuItem>
                        <MenuItem value={"asc"}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box display="flex" justifyContent="center" pt={2} width={"100%"}>
                <List sx={{ width: "100%" }}>
                    {proofs.map((item, index) => {
                        return (
                            <Proof
                                isLoading={isLoading}
                                {...item}
                                key={index}
                            />
                        );
                    })}
                </List>
            </Box>
        </>
    );
};

export { ProofsArea };
