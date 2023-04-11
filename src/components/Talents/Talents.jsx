import React, { useEffect, useState } from "react";
import { Container, LinearProgress, Pagination } from "@mui/material";
import { TalentsArea } from "./components/TalentsArea/TalentsArea";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { talentsAPI } from "../../api/talentsAPI";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPage,
    setTalents,
    setTotalPages
} from "../../redux/reducers/talentsReducer";

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

            if (page > total) {
                navigate(`/talents?page=${total}`);
                return;
            }
            dispatch(setTalents(response.talents));
            dispatch(setTotalPages(total));
            setIsLoading(false);
        };

        getTalents(undefined, urlPage).catch(err => console.log(err));
    }, [location]);

    const handleChange = (e, value) => {
        dispatch(setCurrentPage(value));
        navigate(`/talents?page=${value}`);
    };

    if (!talents || isLoading) {
        return <LinearProgress />;
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
