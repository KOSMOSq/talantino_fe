import { Box, Divider, ListItem, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Report } from "../../Report/Report";
import { ModalConfirmation } from "../../../../ModalConfirmation/ModalConfirmation";
import { Menu } from "../../../../../shared/components/Menu/Menu";
import { sendReportThunk } from "../../../../../redux/reducers/proofsReducer";
import { ProofContent } from "./components/ProofContent/ProofContent";
import { ProofAuthor } from "./components/ProofAuthor/ProofAuthor";

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
                                <ProofAuthor
                                    isLoading={isLoading}
                                    author={author}
                                    date={date}
                                    handleClick={handleClick}
                                />
                            ) : null}
                            <ProofContent
                                isAuth={isAuth}
                                isLoading={isLoading}
                                title={title}
                                id={id}
                                token={token}
                                description={description}
                                skills={skills}
                                isKudosed={isKudosed}
                                totalKudos={totalKudos}
                                totalKudosFromSponsor={totalKudosFromSponsor}
                            />
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
                        title={`Are you sure you want to report "${title}"`}
                        description="This proof will be sent for verification by the site moderator."
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
