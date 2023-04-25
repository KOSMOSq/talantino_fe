import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setMessage } from "../../redux/reducers/appReducer";
import { Container, LinearProgress } from "@mui/material";
import { sponsorAPI } from "../../api/sponsorAPI";
import { sponsor } from "../../common/sponsor";
import { SideBar } from "../TalentProfile/components/SideBar/SideBar";
import { SponsorMainContent } from "./components/SponsorMainContent/SponsorMainContent";

const SponsorProfile = () => {
    const [sponsorInfo, setSponsorInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { sponsorId } = useParams();

    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const getSponsor = async () => {
            setIsLoading(true);
            //const response = await sponsorAPI.getSponsor(sponsorId, token);
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

export { SponsorProfile };