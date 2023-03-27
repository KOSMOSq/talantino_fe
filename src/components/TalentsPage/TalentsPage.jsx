import React, { useEffect, useState } from "react";
import { Box, Container, LinearProgress, Pagination } from "@mui/material";
import { TalentsArea } from "./components/TalentsArea/TalentsArea";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { talentsAPI } from "../../api/talentsAPI";

const Talents = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [talents, setTalents] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (!isLoading) {
			setIsLoading(true);
		}

		const urlPage = Number(searchParams.get("page")) || page;
		setPage(urlPage);

		const getTalents = async (amount = 9, page) => {
			const response = await talentsAPI.getTalents(amount, page - 1);
			const total = Math.ceil(response.totalAmount / amount);

			if (urlPage > total) {
				navigate(`/talents?page=${total}`);
			}
			setTalents(response.talents);
			setTotalPages(total);
			setIsLoading(false);
		};

		getTalents(undefined, urlPage)
			.catch(err => console.log(err));
	}, [location]);

	const handleChange = (e, value) => {
		navigate(`/talents?page=${value}`);
	};

	if (!talents || isLoading) {
		return <Box sx={{ width: "100%" }}>
			<LinearProgress/>
		</Box>
	}

	return (
		<Container sx={{ maxWidth: { xl: "1900px" }, display: "flex", flexDirection: "column" }}>
			<TalentsArea talents={talents} />
			<Pagination
				sx={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto" }}
				page={page}
				count={totalPages}
				onChange={handleChange}
			/>
		</Container>
	);
};

export { Talents };
