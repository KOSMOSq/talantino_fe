import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { talentsAPI } from "../../../../api/talentsAPI";
import { clearData } from "../../../../redux/reducers/authReducer";
import { ModalConfirmation } from "../../../ModalConfirmation/ModalConfirmation";

function DeleteTalent() {
    const [open, setOpen] = useState(false);

    const token = useSelector(store => store.auth.token);
    const talentId = useSelector(store => store.auth.user.id);

    const dispatch = useDispatch();

    const handleClickDelete = async () => {
        await talentsAPI.deleteTalent(talentId, token);
        dispatch(clearData());
    };
    return (
        <div>
            <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                color="error"
            >
                Delete account
            </Button>
            <ModalConfirmation
                error
                title={"Delete your talent profile?"}
                description={"Are you sure you want to delete your talent profile?\nAccess to it will be lost forever."}
                open={open}
                handleClose={() => setOpen(false)}
                handleArgee={handleClickDelete}
            />
        </div>
    );
}

export { DeleteTalent };
