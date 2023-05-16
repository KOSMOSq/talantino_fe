import { Box, ListItemIcon, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";

const Report = ({ handleReport }) => {
    return (
        <Box display="flex" onClick={() => handleReport()} width="100%">
            <ListItemIcon sx={{ alignSelf: "center", color: "red" }}>
                <FlagIcon fontSize="small" />
            </ListItemIcon>
            <Typography color="red">Report</Typography>
        </Box>
    );
};

export { Report };
