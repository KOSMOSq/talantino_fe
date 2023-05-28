import { Container, Pagination } from "@mui/material";
import { AdminTable } from "../components/AdminTable/AdminTable";
import { ProofsTableHead } from "./components/ProofsTableHead/ProofsTableHead";
import { ProofTableBody } from "./components/ProofTableBody/ProofTableBody";
import { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/reducers/appReducer";
import { ModalConfirmation } from "../../ModalConfirmation/ModalConfirmation";
import { AdminSearch } from "../components/AdminSearch/AdminSearch";

const AdminProofs = () => {
    const [proofs, setProofs] = useState([]);
    const [proofToDelete, setProofToDelete] = useState({});
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [searchParams] = useSearchParams();
    const token = useSelector(store => store.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getProofs = async (token, page, title = "") => {
        const response = await adminApi.getProofs(token, page, title);

        setTotalPages(Math.ceil(response.amount / 10));
        setProofs(response.proofs);
    };

    useEffect(() => {
        const urlPageParam = Number(searchParams.get("page"));
        let urlPage;
        if (urlPageParam && urlPageParam > 0) {
            urlPage = urlPageParam;
        } else {
            navigate(`/proofs?page=1`);
            return;
        }
        if (page !== urlPage) {
            setPage(urlPage);
            return;
        }
        getProofs(token, urlPage - 1).catch(err => {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        });
    }, [searchParams.get("page"), page]);

    const deleteProof = async id => {
        try {
            await adminApi.deleteProof(token, id);
            dispatch(
                setMessage(
                    `Proof with id ${id} was deleted! Reload the page`,
                    "success"
                )
            );
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

    const handleSearch = () => {
        getProofs(token, 0, title);
    };

    const handleChange = (e, value) => {
        navigate(`/proofs?page=${value}`);
    };

    const handleAgreeDeletion = () => {
        setOpen(prev => !prev);
        deleteProof(proofToDelete.proofId);
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <AdminSearch
                value={title}
                setValue={setTitle}
                handleSearch={handleSearch}
                searchLabel="Search by title"
            />
            <AdminTable
                AdminTableHead={ProofsTableHead}
                AdminTableBody={ProofTableBody}
                data={proofs}
                setDataToDelete={setProofToDelete}
                setOpenModal={setOpen}
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
            <ModalConfirmation
                title={`Are you sure you want to delete ${proofToDelete.title}?`}
                description="We cannot restore this proos after deletion."
                open={open}
                handleArgee={handleAgreeDeletion}
                handleClose={() => setOpen(prev => !prev)}
                agreeButtonText="DELETE"
                error
            />
        </Container>
    );
};

export { AdminProofs };
