import { Box, Divider, ListItem, Typography } from "@mui/material";
import { getRelativeTime } from "../../../../../shared/functions/getRelativeTime";
import { KudosButton } from "../../../../../shared/components/KudosButton/KudosButton";

const Proof = ({ id, date, title, description, isKudosed, totalKudos, author }) => {
    return (
        <>
            <ListItem>
                <Box width={"100%"}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, fontSize: 24 }}
                    >
                        {title}
                        <Typography sx={{ fontSize: "10px", color: "#888888" }}>
                            {getRelativeTime(date)}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                overflowWrap: "break-word"
                            }}
                        >
                            {description}
                            {description.length === 200 ? (
                                <Typography
                                    variant="p"
                                    sx={{ fontWeight: 700 }}
                                >
                                    ...
                                </Typography>
                            ) : (
                                ""
                            )}
                        </Typography>
                    </Typography>
                </Box>
                <KudosButton id={id} isKudosed={isKudosed} totalKudos={totalKudos}/>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ marginBottom: 2 }} />
        </>
    );
};

export { Proof };
