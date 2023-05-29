import { Alert, Button, Slide, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/reducers/appReducer";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const PopUpMessage = () => {
    const status = useSelector(store => store.app.status);
    const isMessage = useSelector(store => store.app.isMessage);
    const message = useSelector(store => store.app.messageText);
    const onClick = useSelector(store => store.app.onClick);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(clearMessage());
    };

    return (
        <>
            <Snackbar
                open={isMessage}
                autoHideDuration={3000}
                message={message}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleClose}
                    severity={status}
                    sx={{ width: "100%" }}
                >
                    <Typography variant="span">{message}</Typography>
                    {onClick ? (
                        <Typography
                            variant="span"
                            onClick={onClick}
                            data-tag="NoClickAway"
                            sx={{
                                textDecoration: "underline",
                                cursor: "pointer"
                            }}
                        >
                            {"Click to open!"}
                        </Typography>
                    ) : null}
                </Alert>
            </Snackbar>
        </>
    );
};

export { PopUpMessage };
