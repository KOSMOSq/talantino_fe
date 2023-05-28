import {
    Container,
    Modal,
    Pagination,
    Table,
    TableContainer
} from "@mui/material";
import { TalentsTableHead } from "./components/TalentsTableHead/TalentsTableHead";
import { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import { TalentsTableBody } from "./components/TalentsTableBody/TalentsTableBody";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/reducers/appReducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchTalent } from "./components/SearchTalent/SearchTalent";
import { ModalConfirmation } from "../../ModalConfirmation/ModalConfirmation";
import { AdminTable } from "../components/AdminTable/AdminTable";

const AdminTalents = () => {
    const [talents, setTalents] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector(store => store.auth.token);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [talentToDelete, setTalentToDelete] = useState({});
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const getTalents = async (token, page, email = "") => {
        const response = await adminApi.getTalents(token, page, email);

        setTotalPages(Math.ceil(response.amount / 10));

        setTalents(response.talents);
    };
    useEffect(() => {
        const urlPageParam = Number(searchParams.get("page"));
        let urlPage;
        if (urlPageParam && urlPageParam > 0) {
            urlPage = urlPageParam;
        } else {
            navigate(`/talents?page=${1}`);
            return;
        }
        if (page !== urlPage) {
            setPage(urlPage);
            return;
        }
        getTalents(token, urlPage - 1).catch(err => {
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

    const handleChange = (e, value) => {
        navigate(`/talents?page=${value}`);
    };

    const handleSearch = () => {
        getTalents(token, 0, email);
    };

    const handleAgreeDeletion = () => {
        setOpen(prev => !prev);
        deleteTalent(talentToDelete.id);
    };

    //ban in the future
    const deleteTalent = async id => {
        try {
            await adminApi.deleteTalent(token, id);
            dispatch(
                setMessage(
                    `Talent with id ${id} was deleted! Reload the page`,
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

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <SearchTalent
                getTalents={getTalents}
                value={email}
                setValue={setEmail}
                handleSearch={handleSearch}
            />
            <AdminTable
                AdminTableHead={TalentsTableHead}
                AdminTableBody={TalentsTableBody}
                data={talents}
                setDataToDelete={setTalentToDelete}
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
                title={`Are you sure you want to delete ${talentToDelete.name} ${talentToDelete.surname} ?`}
                description="We cannot restore he/she after deletion."
                open={open}
                handleArgee={handleAgreeDeletion}
                handleClose={() => setOpen(prev => !prev)}
                agreeButtonText="DELETE"
                error
            />
        </Container>
    );
};

export { AdminTalents };
