import { Box, List, FormControl, Select, MenuItem } from "@mui/material";
import { Proof } from "./Proof/Proof";
import { useSelector, useDispatch } from "react-redux";
import { setProofsSortType } from "../../../../redux/reducers/proofsReducer";

const ProofsArea = ({ proofs, isLoading }) => {
    const sortType = useSelector(store => store.proofs.proofsSortType);
    const dispatch = useDispatch();

    const handleChange = event => {
        dispatch(setProofsSortType(event.target.value));
    };

    const mockInfo = {
        id: 0,
        date: 0,
        title: "",
        description: "",
        skills: [],
        isKudosed: false,
        totalKudos: 0,
        totalKudosFromSponsor: 0,
        author: []
    };
    return (
        <>
            <Box mt={"15px"}>
                {!isLoading ? (
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
                ) : null}
            </Box>

            <Box display="flex" justifyContent="center" pt={2} width={"100%"}>
                <List sx={{ width: "100%" }}>
                    {!isLoading
                        ? proofs.map(item => {
                              return <Proof {...item} key={item.id} />;
                          })
                        : Array(9)
                              .fill("")
                              .map((item, index) => {
                                  return (
                                      <Proof
                                          isLoading={isLoading}
                                          {...mockInfo}
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
