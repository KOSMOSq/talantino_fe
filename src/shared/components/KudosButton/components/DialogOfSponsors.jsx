import { useDispatch } from "react-redux";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    DialogActions,
    Dialog
} from "@mui/material";
import { useState } from "react";
import { kudosAPI } from "../../../../api/kudosAPI";
import { setMessage } from "../../../../redux/reducers/appReducer";
import kudosIconActive from "../../../../assets/icons/kudosIconActive.svg";
import CloseIcon from "@mui/icons-material/Close";

const DialogOfSponsors = ({ counter, formatter, id, token }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState([]);

    const handleClickOpen = async () => {
        try {
            const response = await kudosAPI.getSponsorsOfProof(id, token);
            setInfo(response.kudos);
        } catch (err) {
            console.log(err);
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography
                onClick={handleClickOpen}
                component="div"
                sx={{ cursor: "default" }}
                title={`${counter}, press to see sponsors who kudosed`}
            >
                {formatter.format(counter)}
            </Typography>
            <Dialog fullWidth={Boolean("md")} open={open} onClose={handleClose}>
                <DialogActions
                    sx={{
                        paddingTop: 1,
                        paddingRight: 1,
                        paddingBottom: 0,
                        paddingLeft: 0
                    }}
                >
                    <IconButton sx={{ padding: 0 }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <List
                    sx={{
                        paddingLeft: 3,
                        paddingRight: 3,
                        paddingTop: 0,
                        paddingBottom: 3
                    }}
                >
                    {info.length === 0 ? <Typography>{"Nobody send kudos on this proof yet :("}</Typography>: info.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                sx={
                                    index === 0
                                        ? { paddingTop: 0 }
                                        : { paddingTop: 1 }
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={item.sponsor.avatar}
                                        alt={item.sponsor.name}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        item.sponsor.name +
                                        " " +
                                        item.sponsor.surname
                                    }
                                />
                                <ListItemText
                                    primary={item.amountOfKudos}
                                    align="right"
                                    sx={{ marginRight: 1 }}
                                />
                                <img src={kudosIconActive} alt="Kudos" />
                            </ListItem>
                        );
                    })}
                </List>
            </Dialog>
        </>
    );
};

export { DialogOfSponsors };
