import { Box, Avatar, Typography, Chip } from "@mui/material";
import { Links } from "./components/Links/Links";

function SideBar({ userInfo }) {
    return (
        <Box width={"30%"} paddingTop={"7vh"}>
            <Avatar
                alt={userInfo.name}
                src={userInfo.avatar || "error"}
                sx={{
                    width: 256,
                    height: 256,
                    marginBottom: 2,
                    fontSize: "64px"
                }}
            />
            {/* { //TODO: display smth when some field is not set} */}
            <Box>
                <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontSize: "24px" }}
                >
                    {`${userInfo.name} ${userInfo.surname}`}
                </Typography>
                {/* {userInfo.role === "TALENT" ? ( */}
                {userInfo.role !== "SPONSOR" ? (
                    <>
                        <Chip
                            sx={{
                                fontSize: "20px"
                            }}
                            label={userInfo.kind}
                            color="primary"
                            size="medium"
                        />
                        <Typography
                            variant="h6"
                            component="h6"
                            mt={2}
                            sx={{ fontSize: "18px", color: "#888888" }}
                        >
                            {userInfo.location}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "18px", color: "#888888" }}
                        >
                            {userInfo.experience
                                ? `${userInfo.experience} year experience`
                                : null}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "18px", color: "#888888" }}
                        >
                            {userInfo.email}
                        </Typography>
                        <Links talentLinks={userInfo.links} />
                    </>
                ) : userInfo.role === "SPONSOR" ? (
                    <Box display="flex" flexDirection="column">
                        <Typography sx={{ color: "gray" }}>
                            STATS
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                            Balance: <Typography component="span" sx={{ fontWeight: "bold" }}>{userInfo.balance} kudos</Typography>
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                            Total kudosed: <Typography component="span" sx={{ fontWeight: "bold" }}>{userInfo.totalProofsKudosed || 34} proofs</Typography>
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                            Total spent: <Typography component="span" sx={{ fontWeight: "bold" }}>{userInfo.totalKudosSpent || 34} kudos</Typography>
                        </Typography>
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
}

export { SideBar };
