import { Box, Typography } from "@mui/material";

const TitleSection = () => {
    return (
        <Box
            pl={10}
            pr={10}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            mt={7}
        >
            <Typography variant="h1" fontSize={"2.3rem"} fontWeight="700">
                About us
            </Typography>
        </Box>
    );
};

export { TitleSection };
