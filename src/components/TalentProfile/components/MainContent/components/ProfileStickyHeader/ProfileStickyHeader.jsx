import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

function ProfileStickyHeader() {

	const profileSubPages = ["Overview", "Proofs"];
	const navigate = useNavigate();

	const handleClick = (e) => {
		//for future implementation of pages
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
				<IconButton onClick={handleClose} sx={{ marginLeft: "auto" }}>
					<CloseIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export { ProfileStickyHeader };