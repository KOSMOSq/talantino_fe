import React, { useEffect, useState } from "react";
import { Box, Container, Pagination } from "@mui/material";
import { TalentsArea } from "./components/TalentsArea/TalentsArea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { talentsAPI } from "../../api/talentsAPI";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPage,
    setTalents,
    setTotalPages
} from "../../redux/reducers/talentsReducer";
import { setMessage } from "../../redux/reducers/appReducer";
import { FilterDrawer } from "../../shared/components/FilterDrawer/FilterDrawer";
import { ChangeViewButton } from "./components/ChangeViewButton/ChangeViewButton";
import { NoMatchesTalents } from "./components/NoMatchesTalents/NoMatchesTalents";
import { NoTalentsYet } from "./components/NoTalentsYet/NoTalentsYet";
import { setFilterSkills } from "../../redux/reducers/skillsReducer";

const Talents = () => {
    const page = useSelector(store => store.talents.currentPage);
    const totalPages = useSelector(store => store.talents.totalPages);
    const talents = useSelector(store => store.talents.talents);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const skillsParam = searchParams.get("skills");
    const decodedSkillsArray = decodeURIComponent(skillsParam).split(",");

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }
        if (skillsParam) {
            dispatch(setFilterSkills(decodedSkillsArray));
        } else {
            dispatch(setFilterSkills([]));
        }
        const urlPageParam = Number(searchParams.get("page"));
        let urlPage;
        if (urlPageParam && urlPageParam > 0) {
            urlPage = urlPageParam;
        } else {
            navigate(`/talents?page=${1}`);
            return;
        }
        if (page !== urlPage) {
            dispatch(setCurrentPage(urlPage));
            return;
        }

        const getTalents = async (amount = 9, page, query = "") => {
            const response = await talentsAPI.getTalents(
                amount,
                page - 1,
                query
            );
            const total = Math.ceil(response.totalAmount / amount);

            if (page > total && total > 0) {
                navigate(`/talents?page=${total}`);
                return;
            } else if (total === 0 && !skillsParam) {
                dispatch(setMessage("No talents at all (", "error"));
            }
            if (total) {
                dispatch(setTotalPages(total));
            }
            dispatch(setTalents(response.talents));
            setIsLoading(false);
        };

        getTalents(undefined, urlPage, skillsParam).catch(err => {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
            navigate(-1);
        });
    }, [page, searchParams.get("page"), searchParams.get("skills")]);

    const handleChange = (e, value) => {
        dispatch(setCurrentPage(value));
        navigate(
            `/talents?page=${value}${
                skillsParam ? `&skills=${skillsParam}` : ""
            }`
        );
    };

    if (!isLoading && talents.length === 0 && !searchParams.get("skills")) {
        return <NoTalentsYet />;
    }

    return (
        <Container
            sx={{
                maxWidth: { xl: "1900px" },
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                mt={"15px"}
                mb={"15px"}
                mr={20}
                ml={20}
            >
                <FilterDrawer disabled={isLoading} />
                <ChangeViewButton disabled={isLoading} />
            </Box>
            {talents.length === 0 && searchParams.get("skills") ? (
                <NoMatchesTalents />
            ) : (
                <>
                    <TalentsArea talents={talents} isLoading={isLoading} />
                    {!isLoading ? (
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
                    ) : null}
                </>
            )}
        </Container>
    );
};

export { Talents };
