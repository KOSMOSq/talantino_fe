import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { setGlobalError } from "../../../../../../redux/reducers/appReducer";

function ProfileStickyHeader({ nextId, prevId }) {

	const profileSubPages = ["Overview"];
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleClick = (e) => {
		//for future implementation of pages
	};

	const currentPage = useSelector(store => store.talents.currentPage);
	const handleClose = () => {
		navigate(`/talents/?page=${currentPage}`);
	};

	const handleNextTalent = () => {
		if (nextId) {
			navigate(`/talent/${nextId}`);
		} else {
			dispatch(setGlobalError("No more talents"));
		}
	};

	const handlePrevTalent = () => {
		if (prevId) {
			navigate(`/talent/${prevId}`);
		} else {
			dispatch(setGlobalError("No more previous talents"));
		}
	};

	return (
		<AppBar position="sticky" color="inherit" sx={{ boxShadow: "0 1px 0 0 #888888", height: "7vh", marginTop: "1vh" }}>
			<Toolbar variant="dense" sx={{ display: "flex" }}>
				{profileSubPages.map((item) => {
					let itemLowerCase = item.toLocaleLowerCase();
					return (
						<Button
							key={itemLowerCase}
							onClick={handleClick}
							sx={{ padding: "10px", fontSize: 14 }}>
							{item}
						</Button>)
				})}
				<Button sx={{ marginLeft: "auto" }} onClick={handlePrevTalent}>PREV TALENT</Button>
				<Button onClick={handleNextTalent}>NEXT TALENT</Button>
				<IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export { ProfileStickyHeader };