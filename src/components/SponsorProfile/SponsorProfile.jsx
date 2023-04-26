import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { setMessage } from "../../redux/reducers/appReducer";
import { Container, LinearProgress } from "@mui/material";
import { SideBar } from "../TalentProfile/components/SideBar/SideBar";
import { SponsorMainContent } from "./components/SponsorMainContent/SponsorMainContent";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const SponsorProfile = () => {
    const [sponsorInfo, setSponsorInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const sponsor = useSelector(store => store.auth.user);
    const { sponsorId } = useParams();
    

    const dispatch = useDispatch();

    useEffect(() => {
        const getSponsor = async () => {
            setIsLoading(true);
            const response = sponsor;
            setSponsorInfo(response);
            setIsLoading(false);
        };

        getSponsor().catch(err =>
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            )
        );
    }, [sponsorId]);

    if (sponsor.role !== "SPONSOR") {
        return <Navigate to="/" />
    }

    if (isLoading || !sponsorInfo) {
        return <LinearProgress />;
    }

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: "24px",
                paddingRight: "24px"
            }}
        >
            <SideBar userInfo={sponsorInfo}/>
            <SponsorMainContent />
        </Container>
    );
};

export default withAuthRedirect(SponsorProfile);