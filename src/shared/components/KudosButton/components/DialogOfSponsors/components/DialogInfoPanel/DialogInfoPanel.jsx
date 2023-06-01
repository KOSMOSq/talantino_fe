import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DialogInfoPanel = ({ handleClose }) => {
    return (
        <Box m="1.5rem" display="flex" justifyContent="space-between">
            <Typography
                fontSize="1.4rem"
                fontWeight="700"
                width="100%"
                align="center"
            >
                Sponsors who kudosed this proof:
            </Typography>
            <IconButton size="small" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </Box>
    );
};

export { DialogInfoPanel };
