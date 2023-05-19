import { Button, IconButton, Box, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../../../redux/reducers/appReducer";
import { LinkTabs } from "../../../../../../shared/components/LinkTabs/LinkTabs";

function ProfileStickyHeader({ nextId, prevId, talentId }) {
    const id = useSelector(store => store.auth.user.id);
    const currentPage = useSelector(store => store.talents.currentPage);
    const profileSubPages = ["Overview", "Proofs"];
    if (id === Number(talentId)) {
        profileSubPages.push("Statistics");
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                        key={talentId}
                        tabs={profileSubPages.map(item => ({
                            label: item,
                            href: item === "Overview" ? "" : item.toLowerCase()
                        }))}
                    />
                </Box>
                <Box sx={{ marginLeft: "auto", marginTop: "6px" }}>
                    <Button
                        sx={{ borderRadius: "10px" }}
                        onClick={handleNextTalent}
                        disabled={!nextId}
                    >
                        NEXT TALENT
                    </Button>
                    <Button
                        sx={{ borderRadius: "10px" }}
                        onClick={handlePrevTalent}
                        disabled={!prevId}
                    >
                        PREV TALENT
                    </Button>
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
