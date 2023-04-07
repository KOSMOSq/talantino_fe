import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { setGlobalError } from "../../../../../../redux/reducers/appReducer";

function ProfileStickyHeader({ nextId, prevId }) {

	const profileSubPages = ["Overview", "Proofs"];
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const currentPage = useSelector(store => store.talents.currentPage);
	const handleClose = () => {
		navigate(`/talents/?page=${currentPage}`);
	};

	const handlePrevTalent = () => {
		if (nextId) {
			navigate(`/talent/${nextId}`);
		} else {
			dispatch(setGlobalError("No more talents"));
		}
	};

	const handleNextTalent = () => {
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
					const itemLowerCase = item.toLocaleLowerCase();
					return (
						<Button
							key={itemLowerCase}
							component={NavLink}
							to={`${itemLowerCase === "overview" ? "" : itemLowerCase}`}
						>
							{item}
						</Button>)
				})}
				<Button sx={{ marginLeft: "auto" }} onClick={handlePrevTalent} disabled={!nextId}>PREV TALENT</Button>
				<Button onClick={handleNextTalent} disabled={!prevId}>NEXT TALENT</Button>
				<IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export { ProfileStickyHeader };