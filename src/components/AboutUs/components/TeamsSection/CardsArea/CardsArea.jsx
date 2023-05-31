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
                                "https://lh3.google.com/u/0/d/1bkTOgbnIs0wwSkLuyO1IUPQOwUVzgFyK=w1920-h929-iv1"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Maksym Lavrovskyi"}
                            photo={
                                "https://lh3.google.com/u/0/d/1Wei_u2H2UtVG7AnwQEcLBksCCfvuszB_=w1920-h872-iv1"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Dmytro Kataiev"}
                            photo={
                                "https://lh3.google.com/u/0/d/1_uWABtANJvGORd4_1Z1yRT7aaAjdVdCm=w1920-h872-iv1"
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
                                "https://lh3.google.com/u/0/d/1oLTnr4gAxMAMS352ClJs2hFc2MDmXKEz=w1265-h872-iv1"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Vladyslav Liubchyk"}
                            photo={
                                "https://lh3.google.com/u/0/d/1keG6L82-ZYq-c3oaRbIpRP3CT8ZHQPCz=w1265-h872-iv1"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Sofiia Kazantseva"}
                            photo={
                                "https://lh3.google.com/u/0/d/1ULudRBK-LYyhcdmmPLHW6iT-6wrg37QS=w1265-h872-iv1"
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
                                "https://lh3.google.com/u/0/d/1ilj9PGs9BIEeQxLX34w8akXBvCaSdVKr=w1265-h872-iv1"
                            }
                            studyPlace={"NURE"}
                        />
                        <CardTeamMember
                            fullName={"Oleksii Pedun"}
                            photo={
                                "https://lh3.google.com/u/0/d/1tYDeD-N6OR7vGAXQIdIQdQSK5jYloMS9=w1265-h872-iv1"
                            }
                            studyPlace={"UIPA"}
                        />
                        <CardTeamMember
                            fullName={"Maxim Koropets"}
                            photo={
                                "https://lh3.google.com/u/0/d/1aRA-WbBjUCefBxqO0lM0SDL_F5jXn7nJ=w1265-h872-iv1"
                            }
                            studyPlace={"SSU"}
                        />
                        <CardTeamMember
                            fullName={"Kateryna Nikitenko"}
                            photo={
                                "https://lh3.google.com/u/0/d/1w1KuQpi7qSyez6IxXm0-W_nR8IP3rg0E=w1265-h872-iv1"
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
                                "https://lh3.google.com/u/0/d/1MnzJfobH92mkfHO7xPCanaDkGnMqG2Ke=w1920-h929-iv1"
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
