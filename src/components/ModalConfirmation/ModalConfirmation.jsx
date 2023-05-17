import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ModalConfirmation = ({
    title,
    description,
    open,
    handleClose,
    handleArgee,
    agreeButtonText,
    error = false,
    infoDialog = false
}) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                    color={error ? "error" : ""}
                    display="flex"
                    alignItems="center"
                    gap="6px"
                >
                    {error ? (
                        <ErrorOutlineIcon sx={{ marginBottom: "2px" }} />
                    ) : null}
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!infoDialog ? (
                        <>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                onClick={handleArgee}
                                autoFocus
                                color="error"
                            >
                                {agreeButtonText}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={handleArgee} autoFocus color="primary">
                            Ok
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export { ModalConfirmation };
