import {
    Avatar,
    Box,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import { getShortRelativeTime } from "../../../../../shared/functions/getRelativeTime";

const KudosNotification = ({
    fromSponsor,
    sponsorAvatar,
    proofTitle,
    amount,
    receivedDate,
    id,
    onHoverNotification,
    read
}) => {
    return (
        <Box data-id={id} onMouseOver={onHoverNotification}>
            <ListItem
                alignItems="flex-start"
                sx={{ margin: "6px", paddingLeft: "8px", paddingRight: "8px", backgroundColor: read ? "": "#e9e9e9", borderRadius: "10px", width: "300px" }}
            >
                <ListItemAvatar>
                    <Avatar alt={fromSponsor} src={sponsorAvatar}>
                        {fromSponsor[0]}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        fromSponsor + " • " + getShortRelativeTime(receivedDate)
                    }
                    secondary={
                        <>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Has sent {amount} kudos on your proof:
                            </Typography>
                            {" " + proofTitle}
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ mr: "10px" }} />
        </Box>
    );
};

export { KudosNotification };
