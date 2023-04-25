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
                        <Typography >
                            -- STATS -- 
                        </Typography>
                        <Typography >
                            BALANCE: 78 KUDOS
                        </Typography>
                        <Typography >
                            PROOFS KUDOSED: 45
                        </Typography>
                        <Typography >
                            TOTAL KUDOS SPENT: 987 
                        </Typography>
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
}

export { SideBar };
