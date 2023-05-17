import { useEffect, useState } from "react";
import { sponsorAPI } from "../../../../api/sponsorAPI";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../redux/reducers/appReducer";
import { Box, Divider, Typography } from "@mui/material";
import { getRelativeTime } from "../../../../shared/functions/getRelativeTime";

const KudosHistory = () => {
    const [history, setHistory] = useState([]);
    //const [kudosHistory, setKudosHistory] = useState([]);

    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const getHistory = async () => {
            const response = await sponsorAPI.getBalanceHistory(token);
            setHistory(response);
            //const kudosResponse = await sponsorAPI.getKudosHistory(token);
            //setKudosHistory(kudosResponse);
        };

        getHistory().catch(err =>
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            )
        );
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: "90%",
                    marginRight: "auto",
                    marginLeft: "auto",
                    marginTop: "32px"
                }}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                {history.reverse().map(elem => {
                    return (
                        <>
                            <Box display="flex">
                                <Typography
                                    component="span"
                                    sx={{
                                        marginLeft: "48px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    + {elem.amount} kudos
                                </Typography>
                                <Typography
                                    component="span"
                                    sx={{
                                        marginLeft: "auto",
                                        marginRight: "48px",
                                        color: "gray"
                                    }}
                                >
                                    {getRelativeTime(elem.date)}
                                </Typography>
                            </Box>
                            <Divider />
                        </>
                    );
                })}
            </Box>
        </>
    );
};

export { KudosHistory };
