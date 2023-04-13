import React, { useEffect, useState } from "react";
import {
    Container,
    LinearProgress,
    Pagination,
    Typography
} from "@mui/material";
import { TalentsArea } from "./components/TalentsArea/TalentsArea";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { talentsAPI } from "../../api/talentsAPI";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPage,
    setTalents,
    setTotalPages
} from "../../redux/reducers/talentsReducer";
import { setMessage } from "../../redux/reducers/appReducer";

const Talents = () => {
    const dispatch = useDispatch();
    const page = useSelector(store => store.talents.currentPage);
    const totalPages = useSelector(store => store.talents.totalPages);
    const talents = useSelector(store => store.talents.talents);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }

        const urlPageParam = Number(searchParams.get("page"));
        const urlPage =
            urlPageParam && urlPageParam > 0
                ? urlPageParam
                : (() => {
                      navigate(`/talents?page=${1}`);
                      return 1;
                  })();
        dispatch(setCurrentPage(urlPage));

        const getTalents = async (amount = 9, page) => {
            const response = await talentsAPI.getTalents(amount, page - 1);
            const total = Math.ceil(response.totalAmount / amount);

            if (page > total && total > 0) {
                navigate(`/talents?page=${total}`);
                return;
            } else if (total === 0) {
                dispatch(setMessage("No talents at all ("));
            }
            if (total) {
                dispatch(setTotalPages(total));
            }
            dispatch(setTalents(response.talents));
            setIsLoading(false);
        };

        getTalents(undefined, urlPage).catch(err => dispatch(
            setMessage(
                err.response?.data.message
                    ? err.response.data.message
                    : "Network error",
                "error"
            )
        ));
    }, [location]);

    const handleChange = (e, value) => {
        dispatch(setCurrentPage(value));
        navigate(`/talents?page=${value}`);
    };

    if (isLoading) {
        return <LinearProgress />;
    } else if (talents.length === 0) {
        return (
            <Typography variant="h6" sx={{ textAlign: "center", marginTop: "200px" }}>
                {"No talents yet :("}
                <Typography variant="caption" sx={{ display: "block" }}>
                    {
                        "You can create account and become the first talent in our application!"
                    }
                </Typography>
            </Typography>
        );
    }

    return (
        <Container
            sx={{
                maxWidth: { xl: "1900px" },
                display: "flex",
                flexDirection: "column"
            }}
        >
            <TalentsArea />
            <Pagination
                sx={{
                    marginTop: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 2
                }}
                page={page}
                count={totalPages}
                onChange={handleChange}
            />
        </Container>
    );
};

export { Talents };
