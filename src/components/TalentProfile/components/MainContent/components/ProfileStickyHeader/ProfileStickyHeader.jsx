import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { setGlobalError } from "../../../../../../redux/reducers/appReducer";

function ProfileStickyHeader({ talentId }) {

	const profileSubPages = ["Overview", "Proofs"];
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const totalTalents = useSelector(store => store.talents.totalTalents);

	const handleClick = (e) => {
		//for future implementation of pages
	};

	const handleNextTalent = () => {
		let id = talentId + 1;
		if (id > totalTalents) {
			dispatch(setGlobalError("No more talents"));
			return;
		}
		navigate(`/talent/${id}`);
	};

	const handlePrevTalent = () => {
		let id = talentId - 1;
		if (id < 1) {
			dispatch(setGlobalError("No more talents"));
			return;
		}
		navigate(`/talent/${id}`);
	};

	const currentPage = useSelector(store => store.talents.currentPage);
	const handleClose = () => {
		navigate(`/talents/?page=${currentPage}`);
	}


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
				<IconButton onClick={handleClose} sx={{ marginLeft: "15px" }}>
					<CloseIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export { ProfileStickyHeader };