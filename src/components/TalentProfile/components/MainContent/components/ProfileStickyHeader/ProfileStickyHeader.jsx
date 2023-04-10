import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalError } from "../../../../../../redux/reducers/appReducer";
import { useLocation } from "react-router-dom";

function ProfileStickyHeader({ nextId, prevId }) {
    const location = useLocation();
    const from = location.state && location.state.from;
    const { talentId } = useParams();

    const profileSubPages = ["Overview", "Proofs"];
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <AppBar
            position="sticky"
            color="inherit"
            sx={{
                boxShadow: "0 1px 0 0 #888888",
                height: "7vh",
                marginTop: "1vh"
            }}
        >
            <Toolbar variant="dense" sx={{ display: "flex" }}>
                {profileSubPages.map(item => {
                    const itemLowerCase = item.toLocaleLowerCase();
                    return (
                        <Button
                            key={itemLowerCase}
                            href={`/talent/${talentId}/`}
                            component={NavLink}
                            onClick={e => {
                                e.preventDefault();
                                navigate(
                                    `/talent/${talentId}/${
                                        itemLowerCase === "overview"
                                            ? ""
                                            : itemLowerCase
                                    }`,
                                    {
                                        state:
                                            from !== "profile-click"
                                                ? { from: null }
                                                : { from: "profile-click" }
                                    }
                                );
                            }}
                        >
                            {item}
                        </Button>
                    );
                })}

                <Box sx={{ marginLeft: "auto" }}>
                    {from !== "profile-click" ? (
                        <>
                            <Button
                                onClick={handlePrevTalent}
                                disabled={!prevId}
                            >
                                PREV TALENT
                            </Button>
                            <Button
                                onClick={handleNextTalent}
                                disabled={!nextId}
                            >
                                NEXT TALENT
                            </Button>
                        </>
                    ) : (
                        ""
                    )}

                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export { ProfileStickyHeader };
