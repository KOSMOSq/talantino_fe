import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { useState } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useDispatch, useSelector } from "react-redux";
import { talentsAPI } from "../../../../api/talentsAPI";
import { clearData } from "../../../../redux/reducers/authReducer";

function DeleteTalent() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const token = useSelector((store) => store.auth.token);
	const talentId = useSelector((store) => store.auth.id);

	const dispatch = useDispatch();

	const handleClickDelete = async () => {
		const response = await talentsAPI.deleteTalent(talentId, token);
		dispatch(clearData());
		console.log(response);
	};
	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				sx={{ color: "red", borderColor: "red" }}
			>
				Delete account
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: "transparent",
						boxShadow: "none",
					},
				}}
			>
				<DialogContent>
					<Alert severity="error">
						<AlertTitle>Delete your talent profile?</AlertTitle>
						Are you sure you want to delete your talent profile? Access to it
						will be lost forever.{" "}
						<strong>Access to it will be lost forever.</strong>
						<DialogActions>
							<Button
								autoFocus
								onClick={(handleClose, handleClickDelete)}
								sx={{ color: "red" }}
							>
								Delete
							</Button>
							<Button onClick={handleClose} autoFocus>
								Cancel
							</Button>
						</DialogActions>
					</Alert>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export { DeleteTalent };
