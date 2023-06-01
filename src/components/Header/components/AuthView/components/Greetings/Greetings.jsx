import { Avatar, IconButton, Typography } from "@mui/material";

const Greetings = ({ open, avatar, name, handleClick }) => {
    return (
        <Typography
            sx={{
                marginLeft: "16px",
                right: 40,
                fontSize: 20,
                color: "grey"
            }}
        >
            Hi, {name}
            <IconButton
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
            >
                <Avatar sx={{ width: 50, height: 50 }} alt={name} src={avatar}>
                    {name[0]}
                </Avatar>
            </IconButton>
        </Typography>
    );
};

export { Greetings };
