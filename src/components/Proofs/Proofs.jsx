import {
    Container,
    LinearProgress,
    Pagination,
    Typography
} from "@mui/material";
import { ProofsArea } from "./components/ProofsArea/ProofsArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setPage,
    setIsLoading,
    getProofsThunk,
    setProofs
} from "../../redux/reducers/proofsReducer";

const Proofs = () => {
    const proofs = useSelector(store => store.proofs.proofs);
    const isLoading = useSelector(store => store.proofs.isLoading);
    const page = useSelector(store => store.proofs.currentPage);
    const totalPages = useSelector(store => store.proofs.totalPages);
    const sortType = useSelector(store => store.proofs.proofsSortType);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading) {
            dispatch(setIsLoading(true));
        }
        const urlPageParam = Number(searchParams.get("page"));
        const urlPage =
            urlPageParam && urlPageParam > 0
                ? urlPageParam
                : (() => {
                      navigate(`/proofs?page=${1}`);
                      return 1;
                  })();
        if (urlPage < 1) {
            dispatch(setPage(1));
            navigate(`/proofs?page=1`);
            return;
        }
        dispatch(setPage(urlPage));

        dispatch(getProofsThunk(urlPage, 9, sortType, navigate));

        return () => {
            dispatch(setProofs([]));
        }
    }, [page, sortType, location]);

    if (isLoading) {
        return <LinearProgress />;
    } else if (proofs.length === 0) {
        return (
            <Typography
                variant="h6"
                sx={{ textAlign: "center", marginTop: "200px" }}
            >
                {"No proofs yet :("}
                <Typography variant="caption" sx={{ display: "block" }}>
                    {"You can create the first proof in our application!"}
                </Typography>
            </Typography>
        );
    }

    const handleChange = (e, value) => {
        dispatch(setPage(value));
        navigate(`/proofs?page=${value}`);
    };

    return (
        <Container
            sx={{ width: "700px", display: "flex", flexDirection: "column" }}
        >
            <ProofsArea proofs={proofs} />
            <Pagination
                sx={{
                    marginTop: 1,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 4
                }}
                page={page}
                count={totalPages}
                onChange={handleChange}
            />
        </Container>
    );
};

export default Proofs;
