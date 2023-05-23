import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItem,
    MenuItem,
    Skeleton,
    Tooltip,
    Typography
} from "@mui/material";
import { KudosButton } from "../../../../../shared/components/KudosButton/KudosButton";
import { ProofSkillsArea } from "../../../../TalentProfile/components/MainContent/components/TalentProofArea/components/ProofSkillsArea/ProofSkillsArea";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { proofsAPI } from "../../../../../api/proofsAPI";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../../redux/reducers/appReducer";
import { Report } from "../../Report/Report";
import { ModalConfirmation } from "../../../../ModalConfirmation/ModalConfirmation";
import { ProofTime } from "../../../../../shared/components/ProofTime/ProofTime";
import { ProofDescription } from "./components/ProofDescription.jsx/ProofDescription";
import { Menu } from "../../../../../shared/components/Menu/Menu";

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
    const isAuth = useSelector(store => store.auth.isAuth);
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
        handleClose();
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
                        <Box>
                            {isAuth ? (
                                <Box
                                    display="flex"
                                    gap={1.2}
                                    sx={{ width: "100%", marginBottom: "6px" }}
                                >
                                    <Avatar
                                        component={Link}
                                        to={`/talent/${author.id}`}
                                        alt={author.name + " " + author.surname}
                                        src={author.avatar || "error"}
                                        sx={{
                                            width: "46px",
                                            height: "46px",
                                            textDecoration: "none"
                                        }}
                                    />
                                    <Box alignSelf="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                textDecoration: "none",
                                                color: "#202020"
                                            }}
                                            component={Link}
                                            to={`/talent/${author.id}`}
                                        >
                                            {author.name + " " + author.surname}
                                        </Typography>
                                        <ProofTime date={date} />
                                    </Box>
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{
                                            alignSelf: "start",
                                            marginLeft: "auto"
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>
                            ) : null}
                            <Box display="flex">
                                <Box>
                                    <Tooltip
                                        title={
                                            isAuth
                                                ? ""
                                                : "Log in to see proof's author"
                                        }
                                        placement="left"
                                        arrow
                                        enterDelay={1000}
                                        enterNextDelay={1000}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: 24
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </Tooltip>
                                    <ProofDescription
                                        isAuth={isAuth}
                                        id={id}
                                        token={token}
                                        description={description}
                                    />
                                    <ProofSkillsArea skills={skills} />
                                    <Box
                                        sx={{
                                            alignSelf: "center",
                                            marginTop: "4px",
                                            marginLeft: "-10px",
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <KudosButton
                                            id={id}
                                            isKudosed={isKudosed}
                                            totalKudos={totalKudos}
                                            totalKudosFromSponsor={
                                                totalKudosFromSponsor
                                            }
                                            alignRight
                                            skillsAmount={
                                                skills.length
                                                    ? skills.length
                                                    : 0
                                            }
                                            clikedFrom="proof"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        handleClose={handleClose}
                        transformOrigin="right top"
                    >
                        <MenuItem onClick={handleClickReport}>
                            <Report />
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
