import { Container, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { talentsAPI } from "../../api/talentsAPI";
import { useLocation } from "react-router-dom";
import { SideBar } from "./components/SideBar/SideBar";
import { MainContent } from "./components/MainContent/MainContent";
import { useSelector } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

function TalentProfile() {
    const [talentInfo, setTalentInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { talentId } = useParams();

    const token = useSelector(store => store.auth.token);

    useEffect(() => {
        const getTalent = async () => {
            setIsLoading(true);
            const response = await talentsAPI.getTalent(talentId, token);
            setTalentInfo(response);
            setIsLoading(false);
        }

        getTalent()
            .catch(error => console.log(error));
    }, [talentId]);

    if (isLoading || !talentInfo) {
        return <LinearProgress />;
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "row", paddingLeft: "24px", paddingRight: "24px" }}>
            <SideBar talentInfo={talentInfo} />
            <MainContent talentDescription={talentInfo.description} nextId={talentInfo.nextId} prevId={talentInfo.prevId} />
        </Container>
    )
}

export default withAuthRedirect(TalentProfile);