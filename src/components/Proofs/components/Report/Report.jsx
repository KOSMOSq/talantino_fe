import { Box, ListItemIcon, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";

const Report = () => {
    return (
        <Box display="flex">
            <ListItemIcon sx={{ alignSelf: "center", color: "red" }}>
                <FlagIcon fontSize="small" />
            </ListItemIcon>
            <Typography color="red">Report</Typography>
        </Box>
    );
};

export { Report };
