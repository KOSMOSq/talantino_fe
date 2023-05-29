import { Box, Avatar, Typography } from "@mui/material";
import { TalentSideView } from "./components/TalentSideView/TalentSideView";
import { SponsorSideView } from "./components/SponsorSideView/SponsorSideView";

function SideBar({ userInfo }) {
    return (
        <Box width={"30%"} paddingTop={"7vh"}>
            <Box
                width="100%"
                sx={{
                    aspectRatio: "1/1",
                    maxHeight: "256px",
                    maxWidth: "256px"
                }}
            >
                <Avatar
                    alt={userInfo.name}
                    src={userInfo.avatar}
                    sx={{
                        width: "100%",
                        height: "100%",
                        marginBottom: 2,
                        fontSize: "94px"
                    }}
                >
                    {userInfo.name.slice(0, 1)}
                </Avatar>
            </Box>

            <Box>
                <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontSize: "24px" }}
                >
                    {`${userInfo.name} ${userInfo.surname}`}
                </Typography>

                {userInfo.role !== "SPONSOR" ? (
                    <TalentSideView userInfo={userInfo} />
                ) : userInfo.role === "SPONSOR" ? (
                    <SponsorSideView userInfo={userInfo} />
                ) : null}
            </Box>
        </Box>
    );
}

export { SideBar };
