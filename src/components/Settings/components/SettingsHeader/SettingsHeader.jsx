import { Box, Button, Divider, Typography } from "@mui/material";

const SettingsHeader = () => {
    return (
        <>
            <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}
            >
                <Typography
                    sx={{
                        display: "inline",
                        fontSize: 24,
                        fontWeight: "bold"
                    }}
                    component="h6"
                    variant="h6"
                >
                    Editing profile
                </Typography>
                <Button variant="outlined" type="submit" sx={{ fontSize: 16 }}>
                    Save changes
                </Button>
            </Box>
            <Divider sx={{ marginTop: 2 }} />
        </>
    );
};

export { SettingsHeader };
