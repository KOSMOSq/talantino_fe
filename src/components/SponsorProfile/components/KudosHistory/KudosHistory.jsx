import { useEffect, useState } from "react";
import { sponsorAPI } from "../../../../api/sponsorAPI";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../redux/reducers/appReducer";
import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import { ProofTime } from "../../../../shared/components/ProofTime/ProofTime";
import InfiniteScroll from "react-infinite-scroll-component";
import { withDelayedRender } from "../../../../hoc/withDelayedRender";

const KudosHistory = () => {
    const AMOUNT = 20;

    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();

    const getHistory = async () => {
        setIsLoading(prev => true);
        const response = await sponsorAPI.getBalanceHistory(
            token,
            page,
            AMOUNT
        );
        setHistory(history.concat(response.balanceChangings));
        setTotalPages(Math.ceil(response.totalAmount / AMOUNT));
        setPage(prev => prev + 1);
        setIsLoading(prev => false);
    };

    useEffect(() => {
        getHistory().catch(err => {
            console.log("HERE");
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        });
    }, []);

    const DelayedButton = withDelayedRender(() => <Button onClick={getHistory}>LOAD MORE</Button>, 1500);

    return (
        <>
            <InfiniteScroll
                dataLength={history.length}
                next={getHistory}
                hasMore={page < totalPages}
            >
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
                    {history.map((elem, index) => {
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
                                        {elem.amount > 0 ? `+ ${elem.amount}`: `- ${Math.abs(elem.amount)}`} kudos
                                    </Typography>
                                    <ProofTime
                                        date={elem.date}
                                        typoSx={{
                                            marginLeft: "auto",
                                            marginRight: "48px",
                                            color: "gray"
                                        }}
                                    />
                                </Box>
                                <Divider />
                            </>
                        );
                    })}
                </Box>
            </InfiniteScroll>
            <Box
                sx={{ width: "100%" }}
                display={"flex"}
                justifyContent="center"
            >
                {isLoading || !history ? (
                    <Box sx={{ height: "80px", mt: "12px" }}>
                        <CircularProgress size={60} />
                    </Box>
                ) : !isLoading && history.length === 0 ? (
                    <Typography
                        varitant="caption"
                        sx={{ color: "gray" }}
                        align="center"
                    >
                        No history yet!
                    </Typography>
                ) : !(page < totalPages) ? (
                    <Typography
                        varitant="caption"
                        sx={{
                            color: "gray",
                            marginBottom: "10px",
                            marginTop: "16px"
                        }}
                        align="center"
                    >
                        You've reached the end!
                    </Typography>
                ) : (
                    <DelayedButton />
                )}
            </Box>
        </>
    );
};

export { KudosHistory };
