import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { talentsAPI } from "../../../../api/talentsAPI";
import { clearData } from "../../../../redux/reducers/authReducer";
import { ModalConfirmation } from "../../../ModalConfirmation/ModalConfirmation";
import { sponsorAPI } from "../../../../api/sponsorAPI";
import { setMessage } from "../../../../redux/reducers/appReducer";
import { Box } from "@mui/material";

function DeleteUser() {
    const [open, setOpen] = useState(false);

    const token = useSelector(store => store.auth.token);
    const talentId = useSelector(store => store.auth.user.id);
    const role = useSelector(store => store.auth.user.role);

    const dispatch = useDispatch();

    const handleClickDelete = async () => {
        try {
            if (role === "TALENT") {
                await talentsAPI.deleteTalent(talentId, token);
            } else {
                await sponsorAPI.deleteSponsor(talentId, token);
            }
        } catch (error) {
            dispatch(
                setMessage(
                    error.response?.data.message
                        ? error.response.data.message
                        : "Network error",
                    "error"
                )
            );
        }

        dispatch(clearData());
        localStorage.clear();
    };

    const talentDescription = `Are you sure you want to delete your talent profile? Access to it will be lost forever.`;
    const sponsorDescription = `Are you sure you want to delete your sponsor profile? You can restore it during the 7 days after deleting by following the link we'll send to your email. After that period access to your account will be lost forever! `;

    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            mb={4}
            mt={role === "SPONSOR" ? 5 : 0}
        >
            <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                color="error"
            >
                Delete account
            </Button>
            <ModalConfirmation
                error
                title={`Delete your ${role.toLowerCase()} profile?`}
                description={
                    role === "TALENT" ? talentDescription : sponsorDescription
                }
                open={open}
                handleClose={() => setOpen(false)}
                handleArgee={handleClickDelete}
                agreeButtonText="Delete"
            />
        </Box>
    );
}

export { DeleteUser };
