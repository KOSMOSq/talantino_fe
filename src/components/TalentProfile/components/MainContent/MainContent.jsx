import { Box, Typography } from "@mui/material";
import { ProfileStickyHeader } from "./components/ProfileStickyHeader";

function MainContent({ talentDescription, talentId, id }) {
    return (
        <Box width={"70%"} sx={{ display: "flex", flexDirection: "column" }}>
            <ProfileStickyHeader talentId={talentId} id={id}/>
            <Box>
                <Typography variant="h5" component="h5" mt={2} sx={{ fontWeight: 'bold' }}>
                    About
                </Typography>
                <Typography variant="h6" component="h6" mt={2} mb={2}>
                    {talentDescription ? talentDescription :
                        <Typography variant="p" component="p" sx={{ fontSize: "18px", color: "#888888" }}>
                            There you can write about yourself or describe your talents.<br />
                            Only registered users will see this information.</Typography>
                    }
                </Typography>
            </Box>
        </Box>
    )
}

export { MainContent }