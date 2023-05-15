import { Alert, Slide, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/reducers/appReducer";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const PopUpMessage = () => {
    const status = useSelector(store => store.app.status);
    const isMessage = useSelector(store => store.app.isMessage);
    const message = useSelector(store => store.app.messageText);
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
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export { PopUpMessage };
