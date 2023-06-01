import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const StatusSelect = ({ status, handleChange }) => {
    return (
        <Box mb={2}>
            <FormControl sx={{ width: "120px" }}>
                <InputLabel id="selectStatus">Status</InputLabel>
                <Select
                    labelId="selectStatus"
                    label="Status"
                    value={status}
                    onChange={handleChange}
                    sx={{ height: "40px" }}
                >
                    <MenuItem value={"ALL"}>All</MenuItem>
                    <MenuItem value={"PUBLISHED"}>Published</MenuItem>
                    <MenuItem value={"HIDDEN"}>Hidden</MenuItem>
                    <MenuItem value={"DRAFT"}>Draft</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export { StatusSelect };
