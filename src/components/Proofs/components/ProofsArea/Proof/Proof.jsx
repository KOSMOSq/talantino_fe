import { Box, Divider, ListItem, Typography } from "@mui/material";
import { getRelativeTime } from "../../../../../shared/functions/getRelativeTime";

const Proof = ({ date, title, description, author }) => {
    const dateOBJ = new Date(date);
    const dateUTC = Date.UTC(
        dateOBJ.getFullYear(),
        dateOBJ.getMonth(),
        dateOBJ.getDate(),
        dateOBJ.getHours(),
        dateOBJ.getMinutes(),
        dateOBJ.getSeconds()
    );

    return (
        <>
            <ListItem>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, fontSize: 24 }}
                    >
                        {title}
                        <Typography sx={{ fontSize: "10px", color: "#888888" }}>
                            {getRelativeTime(dateUTC)}
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
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
            </ListItem>
            <Divider variant="middle" component="li" sx={{ marginBottom: 2 }} />
        </>
    );
};

export { Proof };