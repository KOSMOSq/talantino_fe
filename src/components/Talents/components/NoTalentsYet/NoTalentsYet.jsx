import { Typography } from "@mui/material";

const NoTalentsYet = () => {
    return (
        <Typography
            variant="h6"
            sx={{ textAlign: "center", marginTop: "200px" }}
        >
            {"No talents yet :("}
            <Typography variant="caption" sx={{ display: "block" }}>
                {
                    "You can create account and become the first talent in our application!"
                }
            </Typography>
        </Typography>
    );
};
export { NoTalentsYet };
