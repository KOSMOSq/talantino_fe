import React, { useEffect, useState } from "react";
import { Container, Pagination } from "@mui/material";
import { TalentsArea } from "./components/TalentsArea/TalentsArea";
import { useLocation, useNavigate } from "react-router-dom";
import { talentsResponseExample, talentsResponseExample2, testTalents } from "../../common/common";
import { talentsAPI } from "../../api/talentsAPI";

const Talents = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [talents, setTalents] = useState();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const queryParameters = new URLSearchParams(location.search);
		const singleValue = Number(queryParameters.get("page")) || page;

		setPage(singleValue);

		const getTalents = async (amount = 9, page) => {
			//const response = await talentsAPI.getTalents(amount, page);
			//setTalents(response.talents);
			setTotalPages(Math.ceil(talentsResponseExample.totalCount / amount));

			if (page === 1) {
				setTalents(talentsResponseExample.talents);
			} else {
				setTalents(talentsResponseExample2.talents);
			}
		};

		getTalents(undefined, singleValue)
			.catch(err => console.log(err));
	}, [location]);

	const handleChange = (e, value) => {
		navigate(`/talents?page=${value}`);
	};

	if (!talents) {
		return <h1>loading</h1>;
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
