import { Box, Button, TextField } from "@mui/material";

const AdminSearch = ({ value, setValue, handleSearch, searchLabel }) => {
    return (
        <Box mt={4} mb={4} display="flex" justifyContent="center" gap={1}>
            <TextField
                label={searchLabel}
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
export { AdminSearch };
