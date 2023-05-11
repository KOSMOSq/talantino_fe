import { Typography } from "@mui/material";

const NoMatchesTalents = () => {
    return (
        <Typography
            variant="h6"
            sx={{ textAlign: "center", marginTop: "200px" }}
        >
            {"No matches talents :("}
            <Typography variant="caption" sx={{ display: "block" }}>
                {"Change your filter parameters to see another results!"}
            </Typography>
        </Typography>
    );
};
export { NoMatchesTalents };
