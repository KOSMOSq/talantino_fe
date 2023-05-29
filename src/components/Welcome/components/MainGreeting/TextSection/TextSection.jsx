import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TextSection = () => {
    const navigate = useNavigate();
    return (
        <Box display="flex" flexDirection="column">
            <Box>
                <Typography variant="h1" fontSize={"2.5rem"} fontWeight="700">
                    Welcome to the world of talent!
                </Typography>
                <Typography
                    variant="h3"
                    fontSize={"1.5rem"}
                    fontWeight="500"
                    mt={4}
                >
                    We are extremely happy to see you on our <br />
                    Talent search website.
                </Typography>
            </Box>
            <Button
                variant="contained"
                sx={{
                    bgcolor: "#3FC2FF",
                    borderRadius: "16px",
                    width: 425,
                    height: 68,
                    mt: 20,
                    ":hover": {
                        bgcolor: "#329bcc"
                    }
                }}
                onClick={() => navigate("/create-acc")}
            >
                <Typography fontSize={"1.5rem"} fontWeight="500">
                    Join us
                </Typography>
            </Button>
        </Box>
    );
};

export { TextSection };
