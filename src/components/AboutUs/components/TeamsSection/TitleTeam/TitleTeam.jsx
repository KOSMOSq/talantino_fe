import { Box, Typography } from "@mui/material";

const TitleTeam = ({ title }) => {
    return (
        <Box
            pl={10}
            pr={10}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            mt={7}
        >
            <Typography variant="h1" fontSize={"2rem"} fontWeight="500">
                {title}
            </Typography>
        </Box>
    );
};

export { TitleTeam };
