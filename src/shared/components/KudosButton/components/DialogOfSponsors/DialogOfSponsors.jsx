import { useDispatch } from "react-redux";
import { Dialog } from "@mui/material";
import { useState } from "react";
import { kudosAPI } from "../../../../../api/kudosAPI";
import { setMessage } from "../../../../../redux/reducers/appReducer";
import { SponsorsList } from "./components/SponsorsList/SponsorsList";
import { DialogInfoPanel } from "./components/DialogInfoPanel/DialogInfoPanel";
import { KudosCount } from "./components/KudosCount/KudosCount";

const DialogOfSponsors = ({ counter, formatter, id, token }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = async () => {
        try {
            const response = await kudosAPI.getSponsorsOfProof(id, token, page);

            setInfo(prev => [...prev, ...response.kudos]);

            if (totalPages === 0) {
                setTotalPages(Math.ceil(response.totalAmount / 5));
            }
            if (info.length === 0) {
                setIsLoading(prev => !prev);
            }
            setPage(prev => prev + 1);
        } catch (err) {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        }
    };

    const handleOpen = () => {
        setIsLoading(true);
        handleClickOpen();
        setOpen(prev => !prev);
    };

    const handleClose = () => {
        setIsLoading(false);
        setOpen(prev => !prev);
        setPage(0);
        setInfo([]);
    };

    return (
        <>
            <KudosCount
                formatter={formatter}
                counter={counter}
                handleOpen={handleOpen}
            />
            <Dialog
                PaperProps={{
                    id: "scrollList",
                    pt: "1.5rem",
                    pb: "1.5rem"
                }}
                fullWidth={Boolean("md")}
                open={open}
                onClose={handleClose}
            >
                <DialogInfoPanel handleClose={handleClose} />
                <SponsorsList
                    isLoading={isLoading}
                    info={info}
                    handleClickOpen={handleClickOpen}
                    page={page}
                    totalPages={totalPages}
                />
            </Dialog>
        </>
    );
};

export { DialogOfSponsors };
