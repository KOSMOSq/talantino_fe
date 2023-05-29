import { Box, Typography } from "@mui/material";

const SponsorSideView = ({ userInfo }) => {
    return (
        <Box display="flex" flexDirection="column">
            <Typography sx={{ color: "gray" }}>STATS</Typography>
            <Typography sx={{ fontSize: "16px" }}>
                Balance:{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {userInfo.balance} kudos
                </Typography>
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
                Total kudosed:{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {userInfo.totalKudosed} proofs
                </Typography>
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
                Total spent:{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {userInfo.totalSpent} kudos
                </Typography>
            </Typography>
        </Box>
    );
};

export { SponsorSideView };
