import {
    Box,
    Chip,
    IconButton,
    ListItemIcon,
    MenuItem,
    Typography
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../../../../../../../shared/themes/neutralColorTheme";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { EditProofForm } from "../../../../../../Forms/EditProofForm/EditProofForm";
import { ModalConfirmation } from "../../../../../../ModalConfirmation/ModalConfirmation";
import { ProofSkillsArea } from "./ProofSkillsArea/ProofSkillsArea";
import { KudosButton } from "../../../../../../../shared/components/KudosButton/KudosButton";
import { ProofTime } from "../../../../../../../shared/components/ProofTime/ProofTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu } from "../../../../../../../shared/components/Menu/Menu";
import { Report } from "../../../../../../Proofs/components/Report/Report";
import { sendReportThunk } from "../../../../../../../redux/reducers/proofsReducer";

function TalentProof({
    date,
    title,
    description,
    status,
    id,
    talentId,
    onDelete,
    skills,
    isKudosed,
    totalKudos,
    authorId,
    totalKudosFromSponsor
}) {
    const [editMode, setEditMode] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openReportModal, setOpenReportModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const role = useSelector(store => store.auth.user.role);
    const authId = useSelector(store => store.auth.user.id);
    const dispatch = useDispatch();

    const handleClickMore = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    const handleClickReport = () => {
        setOpenReportModal(prev => !prev);
        handleCloseMore();
    };
    const handleSendReport = () => {
        dispatch(sendReportThunk(id));
    };

    return (
        <>
            <Box
                sx={{
                    backgroundСolor: "#fff",
                    border: "1px solid #888888",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{ width: "100%" }}>
                    {!editMode ? (
                        <>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{ width: "80%" }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, width: "100%" }}
                                    >
                                        {title}
                                    </Typography>
                                    <ProofTime date={date} />
                                </Box>
                                {+talentId === authId && role === "TALENT" ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "start",
                                            height: "20px",
                                            justifyContent: "right",
                                            width: "30%"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px"
                                            }}
                                        >
                                            <Chip
                                                sx={{
                                                    justifySelf: "right",
                                                    fontSize: "16px"
                                                }}
                                                theme={theme}
                                                color={
                                                    status === "PUBLISHED"
                                                        ? "success"
                                                        : status === "DRAFT"
                                                        ? "default"
                                                        : "neutral"
                                                }
                                                label={status}
                                            />
                                            <IconButton
                                                onClick={handleClickMore}
                                                size="small"
                                                sx={{
                                                    alignSelf: "start",
                                                    marginLeft: "auto"
                                                }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={openMenu}
                                                handleClose={handleCloseMore}
                                                transformOrigin="right top"
                                            >
                                                <MenuItem
                                                    onClick={() => {
                                                        setEditMode(
                                                            prev => !prev
                                                        );
                                                        handleCloseMore();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <EditIcon
                                                            fontSize="medium"
                                                            sx={{
                                                                color: "#1976d2"
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <Typography
                                                        variant="span"
                                                        color={"#1976d2"}
                                                    >
                                                        Edit
                                                    </Typography>
                                                </MenuItem>

                                                <MenuItem
                                                    onClick={() => {
                                                        setOpenDeleteModal(
                                                            prev => !prev
                                                        );
                                                        handleCloseMore();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <DeleteForeverIcon
                                                            fontSize="medium"
                                                            sx={{
                                                                color: "red"
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <Typography
                                                        variant="span"
                                                        color={"red"}
                                                    >
                                                        Delete
                                                    </Typography>
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    </Box>
                                ) : (
                                    <>
                                        <IconButton
                                            onClick={handleClickMore}
                                            size="small"
                                            sx={{
                                                alignSelf: "start",
                                                marginLeft: "auto"
                                            }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>

                                        <Menu
                                            anchorEl={anchorEl}
                                            open={openMenu}
                                            handleClose={handleCloseMore}
                                            transformOrigin="right top"
                                        >
                                            <MenuItem
                                                onClick={handleClickReport}
                                            >
                                                <Report />
                                            </MenuItem>
                                        </Menu>
                                        <ModalConfirmation
                                            title="Reporting proof"
                                            description="Are you sure to report this proof?"
                                            open={openReportModal}
                                            handleClose={() =>
                                                setOpenReportModal(
                                                    prev => !prev
                                                )
                                            }
                                            handleArgee={() => {
                                                handleSendReport();
                                                setOpenReportModal(
                                                    prev => !prev
                                                );
                                            }}
                                            error
                                            agreeButtonText="Report"
                                        ></ModalConfirmation>
                                    </>
                                )}
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    overflowWrap: "break-word",
                                    whiteSpace: "pre-line"
                                }}
                            >
                                {description}
                            </Typography>
                            <ProofSkillsArea skills={skills} proofId={id}/>
                        </>
                    ) : (
                        <EditProofForm
                            id={id}
                            date={date}
                            title={title}
                            description={description}
                            status={status}
                            setEditMode={setEditMode}
                            skills={skills}
                        />
                    )}
                    {!editMode ? (
                        <Box
                            sx={{ ml: "-10px", mb: "-10px", marginTop: "4px" }}
                        >
                            <KudosButton
                                id={id}
                                isKudosed={isKudosed}
                                totalKudos={totalKudos}
                                authorId={talentId}
                                totalKudosFromSponsor={totalKudosFromSponsor}
                                alignRight
                                skillsAmount={skills.length ? skills.length : 0}
                                clikedFrom="proof"
                            />
                        </Box>
                    ) : null}
                </Box>
            </Box>

            <ModalConfirmation
                title={"Are you sure you want delete the proof?"}
                description={"It cannot be restored."}
                open={openDeleteModal}
                handleClose={() => setOpenDeleteModal(false)}
                handleArgee={() => onDelete(id)}
                agreeButtonText="Delete"
            />
        </>
    );
}

export { TalentProof };
