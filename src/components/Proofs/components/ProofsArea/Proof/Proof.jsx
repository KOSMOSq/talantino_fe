import {
    Box,
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import { getRelativeTime } from "../../../../../shared/functions/getRelativeTime";
import { KudosButton } from "../../../../../shared/components/KudosButton/KudosButton";
import { ProofSkillsArea } from "../../../../TalentProfile/components/MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { proofsAPI } from "../../../../../api/proofsAPI";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../../redux/reducers/appReducer";
import { Report } from "../../Report/Report";
import { ModalConfirmation } from "../../../../ModalConfirmation/ModalConfirmation";

const Proof = ({
    id,
    date,
    title,
    description,
    skills,
    isKudosed,
    totalKudos,
    totalKudosFromSponsor,
    author
}) => {
    const token = useSelector(store => store.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const openMenu = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickReport = () => {
        setOpenDialog(prev => !prev);
    };

    const handleSendReport = async () => {
        try {
            await proofsAPI.reportProof(id, token);
            dispatch(setMessage("Your report sent successfully!", "success"));
        } catch (err) {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "You need to log in to send a report.",
                    "error"
                )
            );
        }
    };

    return (
        <>
            <ListItem>
                <Box
                    width={"100%"}
                    display="flex"
                    alignItems="center"
                    justifyContent="end"
                >
                    <Box width={"100%"}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, fontSize: 24 }}
                        >
                            {title}
                            <Typography
                                sx={{ fontSize: "10px", color: "#888888" }}
                            >
                                {getRelativeTime(date)}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    overflowWrap: "break-word"
                                }}
                            >
                                {description}
                                {description.length === 200 ? (
                                    <Typography
                                        variant="p"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        ...
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </Typography>
                        </Typography>
                        <ProofSkillsArea skills={skills} />
                    </Box>
                    <KudosButton
                        id={id}
                        isKudosed={isKudosed}
                        totalKudos={totalKudos}
                        totalKudosFromSponsor={totalKudosFromSponsor}
                    />
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ alignSelf: "start" }}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openMenu}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top"
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom"
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link
                                sx={{
                                    textDecoration: "none",
                                    color: "black",
                                    display: "flex",
                                    width: "100%"
                                }}
                                href={author ? `/talent/${author.id}` : ""}
                                onClick={e => {
                                    e.preventDefault();
                                    if (author !== null) {
                                        navigate(`/talent/${author.id}`);
                                    } else {
                                        dispatch(
                                            setMessage(
                                                "You need to login to see the author.",
                                                "error"
                                            )
                                        );
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        alignSelf: "center"
                                    }}
                                >
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                Proof author
                            </Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                            <Report handleReport={handleClickReport} />
                        </MenuItem>
                    </Menu>
                    <ModalConfirmation
                        title="Reporting proof"
                        description="Are you sure to report this proof?"
                        open={openDialog}
                        handleClose={() => setOpenDialog(prev => !prev)}
                        handleArgee={() => {
                            handleSendReport();
                            setOpenDialog(prev => !prev);
                        }}
                        error
                        agreeButtonText="Report"
                    />
                </Box>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ marginBottom: 2 }} />
        </>
    );
};

export { Proof };
