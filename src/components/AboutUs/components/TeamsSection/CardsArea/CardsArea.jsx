import { Box } from "@mui/material";

import { CardTeamMember } from "./CardTeamMember/CardTeamMember";

const CardsArea = ({ title }) => {
    switch (title) {
        case "Frontend team":
            return (
                <Box
                    pl={10}
                    pr={10}
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    mt={7}
                >
                    <Box
                        width="1740px"
                        height="542px"
                        left="90px"
                        top="1697px"
                        bgcolor="#E0F4FF"
                        borderRadius="60px"
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                        gap={1}
                    >
                        <CardTeamMember
                            fullName={"Bohdan Rohozianskyi"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/rohozianskyi.jpg"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Maksym Lavrovskyi"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/lavrovskyi.jpg"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Dmytro Kataiev"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/kataiev.jpg"
                            }
                            studyPlace={"NLTU"}
                        />
                    </Box>
                </Box>
            );
        case "Backend team":
            return (
                <Box
                    pl={10}
                    pr={10}
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    mt={7}
                >
                    <Box
                        width="1740px"
                        height="542px"
                        left="90px"
                        top="1697px"
                        bgcolor="#E0F4FF"
                        borderRadius="60px"
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                        gap={1}
                    >
                        <CardTeamMember
                            fullName={"Yaroslava Nechaieva"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/nechaieva.jpg"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Vladyslav Liubchyk"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/liubchyk.jpg"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Sofiia Kazantseva"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/kazantseva.jpg"
                            }
                            studyPlace={"NURE"}
                        />
                    </Box>
                </Box>
            );
        case "QA team":
            return (
                <Box
                    pl={10}
                    pr={10}
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    mt={7}
                >
                    <Box
                        width="1740px"
                        height="542px"
                        left="90px"
                        top="1697px"
                        bgcolor="#E0F4FF"
                        borderRadius="60px"
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                        gap={1}
                    >
                        <CardTeamMember
                            fullName={"Anastasiia Mashchenko"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/mashchenko.jpg"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Oleksii Pedun"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/pedun.jpg"
                            }
                            studyPlace={"UIPA"}
                        />
                        <CardTeamMember
                            fullName={"Maxim Koropets"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/koropers.jpg"
                            }
                            studyPlace={"SSU"}
                        />
                        <CardTeamMember
                            fullName={"Kateryna Nikitenko"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/nikitenko.jpg"
                            }
                            studyPlace={"SSU"}
                        />
                    </Box>
                </Box>
            );
        case "Our mentor ❤":
            return (
                <Box
                    pl={10}
                    pr={10}
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    mt={7}
                >
                    <Box
                        width="1740px"
                        height="542px"
                        left="90px"
                        top="1697px"
                        bgcolor="#E0F4FF"
                        borderRadius="60px"
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                        gap={1}
                    >
                        <CardTeamMember
                            fullName={"Olha Shutylieva"}
                            photo={
                                "https://olha-team-backend.s3.amazonaws.com/team/shutylieva.jpg"
                            }
                            studyPlace={"SoftServe"}
                        />
                    </Box>
                </Box>
            );
        default:
            break;
    }
};

export { CardsArea };
