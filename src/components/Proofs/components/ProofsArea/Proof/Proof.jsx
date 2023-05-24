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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Report } from "../../Report/Report";
import { ModalConfirmation } from "../../../../ModalConfirmation/ModalConfirmation";
import { ProofTime } from "../../../../../shared/components/ProofTime/ProofTime";
import { ProofDescription } from "./components/ProofDescription.jsx/ProofDescription";
import { Menu } from "../../../../../shared/components/Menu/Menu";
import { sendReportThunk } from "../../../../../redux/reducers/proofsReducer";

const Proof = ({
    id,
    date,
    title,
    description,
    skills,
    isKudosed,
    totalKudos,
    totalKudosFromSponsor,
    author,
    isLoading
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

    const handleSendReport = () => {
        dispatch(sendReportThunk(id));
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
                                    {!isLoading ? (
                                        <Avatar
                                            component={Link}
                                            to={
                                                !isLoading
                                                    ? `/talent/${
                                                          author && author.id
                                                      }`
                                                    : null
                                            }
                                            alt={
                                                author.name +
                                                " " +
                                                author.surname
                                            }
                                            src={author.avatar}
                                            sx={{
                                                width: "46px",
                                                height: "46px",
                                                textDecoration: "none"
                                            }}
                                        >
                                            {author.name.slice(0, 1)}
                                        </Avatar>
                                    ) : (
                                        <Skeleton
                                            variant="circular"
                                            width={46}
                                            height={46}
                                        ></Skeleton>
                                    )}

                                    <Box alignSelf="center" width="40%">
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                textDecoration: "none",
                                                color: "#202020"
                                            }}
                                            component={Link}
                                            to={
                                                !isLoading
                                                    ? `/talent/${author.id}`
                                                    : null
                                            }
                                        >
                                            {!isLoading ? (
                                                author.name +
                                                " " +
                                                author.surname
                                            ) : (
                                                <Skeleton width="70%" />
                                            )}
                                        </Typography>
                                        {!isLoading ? (
                                            <ProofTime date={date} />
                                        ) : (
                                            <Skeleton width="40%" />
                                        )}
                                    </Box>
                                    {!isLoading ? (
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
                                    ) : null}
                                </Box>
                            ) : null}
                            <Box display="flex">
                                <Box width="100%">
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
                                            {!isLoading ? (
                                                title
                                            ) : (
                                                <Skeleton width="70%" />
                                            )}
                                        </Typography>
                                    </Tooltip>
                                    {!isLoading ? (
                                        <ProofDescription
                                            isAuth={isAuth}
                                            id={id}
                                            token={token}
                                            description={description}
                                        />
                                    ) : (
                                        <Skeleton
                                            variant="rounded"
                                            width="100%"
                                            height={100}
                                        />
                                    )}

                                    {!isLoading ? (
                                        <ProofSkillsArea skills={skills} proofId={id} />
                                    ) : (
                                        <>
                                            <Box
                                                display="flex"
                                                flexWrap="wrap"
                                                sx={{
                                                    width: "100%",
                                                    marginTop: "8px"
                                                }}
                                                gap={0.8}
                                            >
                                                {Array(3)
                                                    .fill("")
                                                    .map((item, index) => (
                                                        <Skeleton
                                                            key={index}
                                                            variant="rounded"
                                                            width={99}
                                                            height={24}
                                                            sx={{
                                                                borderRadius:
                                                                    "16px"
                                                            }}
                                                        />
                                                    ))}
                                            </Box>
                                        </>
                                    )}
                                    <Box
                                        sx={{
                                            alignSelf: "center",
                                            marginTop: "4px",
                                            marginLeft: "-10px",
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        {!isLoading ? (
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
                                        ) : (
                                            <Skeleton
                                                variant="circular"
                                                width={28}
                                                height={28}
                                                sx={{ ml: 1 }}
                                            />
                                        )}
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
                    ></ModalConfirmation>
                </Box>
            </ListItem>
            <Divider variant="middle" component="li" sx={{ marginBottom: 2 }} />
        </>
    );
};

export { Proof };
