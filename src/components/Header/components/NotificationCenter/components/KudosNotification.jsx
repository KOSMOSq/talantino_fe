import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";

const KudosNotification = ({
    fromSponsor,
    sponsorAvatar,
    proofTitle,
    amount
}) => {
    return (
        <>
            <ListItem
                alignItems="flex-start"
                sx={{ paddingLeft: "8px", paddingTop: "6px" }}
            >
                <ListItemAvatar>
                    <Avatar alt={fromSponsor} src={sponsorAvatar}>
                        {fromSponsor[0]}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={fromSponsor}
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
        </>
    );
};

export { KudosNotification };
