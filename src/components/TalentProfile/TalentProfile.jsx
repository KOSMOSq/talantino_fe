import { Container, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { talentsAPI } from "../../api/talentsAPI";
import { SideBar } from "./components/SideBar/SideBar";
import { MainContent } from "./components/MainContent/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { setMessage } from "../../redux/reducers/appReducer";

function TalentProfile() {
    const [talentInfo, setTalentInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { talentId } = useParams();

    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const getTalent = async () => {
            setIsLoading(true);
            const response = await talentsAPI.getTalent(talentId, token);
            setTalentInfo(response);
            setIsLoading(false);
        };

        getTalent().catch(err =>
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            )
        );
    }, [talentId]);

    if (isLoading || !talentInfo) {
        return <LinearProgress />;
    }

    const handleReport = async () => {
        try {
            await talentsAPI.reportTalent(token, talentInfo.id);
            dispatch(
                setMessage(
                    `Talent with id ${talentInfo.id} has been reported.`,
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
                flexDirection: "row",
                paddingLeft: "24px",
                paddingRight: "24px"
            }}
        >
            <SideBar userInfo={talentInfo} handleReport={handleReport} />
            <MainContent
                talentId={talentId}
                talentDescription={talentInfo.description}
                nextId={talentInfo.nextId}
                prevId={talentInfo.prevId}
            />
        </Container>
    );
}

export default withAuthRedirect(TalentProfile);
