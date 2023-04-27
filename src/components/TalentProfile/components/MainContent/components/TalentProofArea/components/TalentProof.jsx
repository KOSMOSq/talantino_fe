import { Box, Chip, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../../../../../../../shared/themes/neutralColorTheme";
import { useSelector } from "react-redux";
import { getRelativeTime } from "../../../../../../../shared/functions/getRelativeTime";
import { useState } from "react";
import { EditProofForm } from "../../../../../../Forms/EditProofForm/EditProofForm";
import { ModalConfirmation } from "../../../../../../ModalConfirmation/ModalConfirmation";
import { KudosButton } from "../../../../../../../shared/components/KudosButton/KudosButton";

function TalentProof({
    date,
    title,
    description,
    status,
    id,
    talentId,
    onDelete,
    isKudosed,
    totalKudos,
    authorId,
    totalKudosFromSponsor
}) {
    const [editMode, setEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const role = useSelector(store => store.auth.user.role);
    const authId = useSelector(store => store.auth.user.id);

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
                                    <Typography
                                        sx={{
                                            fontSize: "10px",
                                            color: "#888888"
                                        }}
                                    >
                                        {getRelativeTime(date)}
                                    </Typography>
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
                                                title="Edit proof"
                                                onClick={() =>
                                                    setEditMode(prev => true)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    setOpenModal(true)
                                                }
                                                title="Delete proof"
                                            >
                                                <DeleteForeverIcon fontSize="medium" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ) : (
                                    ""
                                )}
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    overflowWrap: "break-word"
                                }}
                            >
                                {description}
                            </Typography>
                        </>
                    ) : (
                        <EditProofForm
                            id={id}
                            date={date}
                            title={title}
                            description={description}
                            status={status}
                            setEditMode={setEditMode}
                        />
                    )}
                    {+talentId === authId && role !== "SPONSOR" && !editMode ? (
                        <Box sx={{ ml: "-10px", mb: "-10px" }}>
                            <KudosButton
                                id={id}
                                isKudosed={isKudosed}
                                totalKudos={totalKudos}
                                authorId={authorId}
                                totalKudosFromSponsor={totalKudosFromSponsor}
                            />
                        </Box>
                    ) : null}
                </Box>
                {+talentId !== authId || role !== "TALENT" ? (
                    <KudosButton
                        id={id}
                        isKudosed={isKudosed}
                        totalKudos={totalKudos}
                        authorId={authorId}
                        totalKudosFromSponsor={totalKudosFromSponsor}
                    />
                ) : null}
            </Box>

            <ModalConfirmation
                title={"Are you sure you want delete the proof?"}
                description={"It cannot be restored."}
                open={openModal}
                handleClose={() => setOpenModal(false)}
                handleArgee={() => onDelete(id)}
            />
        </>
    );
}

export { TalentProof };
