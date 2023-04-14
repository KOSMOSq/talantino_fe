import {
    Box,
    List,
    FormControl,
    Select,
    MenuItem
} from "@mui/material";
import { Proof } from "./Proof/Proof";
import { useSelector, useDispatch } from "react-redux";
import { setProofsSortType } from "../../../../redux/reducers/proofsReducer";

const ProofsArea = ({ proofs }) => {
    const sortType = useSelector(store => store.proofs.proofsSortType);
    const dispatch = useDispatch();

    const handleChange = event => {
        dispatch(setProofsSortType(event.target.value));
    };

    return (
        <>
            <Box
                zIndex={1}
                position={"absolute"}
                right={100}
                mt={"15px"}
                mb={"15px"}
            >
                <FormControl sx={{ width: "120px" }}>
                    <Select
                        sx={{ height: "40px" }}
                        variant="outlined"
                        labelId="sortType"
                        id="selectSortType"
                        value={sortType}
                        onChange={handleChange}
                    >
                        <MenuItem value={"desc"}>Newest</MenuItem>
                        <MenuItem value={"asc"}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box display="flex" justifyContent="center" pt={2} width={"100%"}>
                <List sx={{ width: "100%" }}>
                    {proofs.map(item => {
                        return <Proof {...item} key={item.id} />;
                    })}
                </List>
            </Box>
        </>
    );
};

export { ProofsArea };
