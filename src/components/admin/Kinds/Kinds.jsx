import { Container, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { talentsAPI } from "../../../api/talentsAPI";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../components/AdminTable/AdminTable";
import { KindsTableBody } from "./components/KindsTableBody/KindsTableBody";
import { KindsTableHead } from "./components/KindsTableHead/KindsTableHead";
import { adminApi } from "../../../api/adminApi";
import { setMessage } from "../../../redux/reducers/appReducer";
import { useNavigate, useSearchParams } from "react-router-dom";

const Kinds = () => {
    const [kinds, setKinds] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const token = useSelector(store => store.auth.token);

    const getKinds = async (token, page) => {
        const response = await talentsAPI.getKinds(token, page);

        setTotalPages(Math.ceil(response.amount / 10));
        setKinds(response.kinds);
    };

    useEffect(() => {
        const urlPageParam = Number(searchParams.get("page"));

        let urlPage;
        if (urlPageParam && urlPageParam > 0) {
            urlPage = urlPageParam;
        } else {
            navigate(`/kinds?page=${1}`);
            return;
        }
        if (page !== urlPage) {
            setPage(urlPage);
            return;
        }

        getKinds(token, urlPage - 1).catch(err => {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        });
    }, [page, searchParams.get("page")]);

    const handleEdit = async (id, title) => {
        try {
            await adminApi.editKind(token, id, title);
            await getKinds(token, page - 1);
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

    const handleChange = (e, value) => {
        navigate(`/kinds?page=${value}`);
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <AdminTable
                AdminTableBody={KindsTableBody}
                AdminTableHead={KindsTableHead}
                data={kinds}
                handleEdit={handleEdit}
            />
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
export { Kinds };
