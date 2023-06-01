import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { withDelayedRender } from "../../../../../../../../hoc/withDelayedRender";

const EndMessage = ({ handleClick, proofs, isLoading, page, totalPages }) => {
    
    const DelayedButton = withDelayedRender(
        () => <Button onClick={handleClick}>LOAD MORE</Button>,
        1500
    );

    return (
        <Box sx={{ width: "100%" }} display={"flex"} justifyContent="center">
            {isLoading || !proofs ? (
                <Box sx={{ height: "80px" }}>
                    <CircularProgress size={60} />
                </Box>
            ) : !isLoading && proofs.length === 0 ? (
                <Typography
                    varitant="caption"
                    sx={{ color: "gray" }}
                    align="center"
                >
                    No proofs yet!
                </Typography>
            ) : !(page < totalPages) ? (
                <Typography
                    varitant="caption"
                    sx={{
                        color: "gray",
                        marginBottom: "10px",
                        marginTop: "-6px"
                    }}
                    align="center"
                >
                    You've reached the end!
                </Typography>
            ) : (
                <DelayedButton />
            )}
        </Box>
    );
};

export { EndMessage };
