import {
    Button,
    IconButton,
    Box,
    Divider
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../../../redux/reducers/appReducer";
import { useLocation } from "react-router-dom";
import { LinkTabs } from "../../../../../../shared/components/LinkTabs/LinkTabs";

function ProfileStickyHeader({ nextId, prevId }) {
    const location = useLocation();
    const from = location.state && location.state.from;

    const profileSubPages = ["Overview", "Proofs", "Statistics"];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentPage = useSelector(store => store.talents.currentPage);
    const handleClose = () => {
        navigate(`/talents/?page=${currentPage}`);
    };

    const subPage = useParams()["*"];

    const handleNextTalent = () => {
        if (nextId) {
            navigate(`/talent/${nextId}/${subPage ? subPage : ""}`);
        } else {
            dispatch(setMessage("No more talents", "error"));
        }
    };

    const handlePrevTalent = () => {
        if (prevId) {
            navigate(`/talent/${prevId}/${subPage ? subPage : ""}`);
        } else {
            dispatch(setMessage("No more previous talents", "error"));
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", padding: "0px", flexWrap: "wrap" }}>
                <Box>
                    <LinkTabs
                        tabs={profileSubPages.map(item => ({ label: item, href: item === "Overview" ? "" : item.toLowerCase() }))}
                    />
                </Box>
                <Box sx={{ marginLeft: "auto", marginTop: "6px" }}>
                    {from !== "profile-click" ? (
                        <>
                            <Button
                                sx={{ borderRadius: "10px" }}
                                onClick={handlePrevTalent}
                                disabled={!prevId}
                            >
                                PREV TALENT
                            </Button>
                            <Button
                                sx={{ borderRadius: "10px" }}
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
            </Box>
            <Divider />
        </>
    );
}

export { ProfileStickyHeader };
