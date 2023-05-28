import { Box, Button, TextField } from "@mui/material";

const SearchTalent = ({ value, setValue, handleSearch }) => {
    return (
        <Box mt={4} mb={4} display="flex" justifyContent="center" gap={1}>
            <TextField
                label="search by email"
                size="small"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <Button onClick={handleSearch} variant="contained">
                Search
            </Button>
        </Box>
    );
};

export { SearchTalent };
