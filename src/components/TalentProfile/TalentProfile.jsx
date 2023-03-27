import { Container, LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { talentsAPI } from "../../api/talentsAPI";
import { useLocation } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { MainContent } from "./components/MainContent";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function TalentProfile() {
    const [talentInfo, setTalentInfo] = useState();
    const { talentId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const token = useSelector(store => store.auth.token);

    useEffect(() => {
        const getTalent = async () => {
            const response = await talentsAPI.getTalent(talentId, token);
            setTalentInfo(response);
        }

        if (token) {
            getTalent().catch(error => console.log(error))
        }
        else {
            navigate(`/login`);
        }
    }, [location, token, navigate, talentId]);

    if (!talentInfo) {
        return <Box sx={{ width: "100%" }}>
            <LinearProgress />
        </Box>
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "row", paddingLeft: "24px", paddingRight: "24px" }}>
            <SideBar talentInfo={talentInfo} />
            <MainContent talentDescription={talentInfo.description} talentId={talentInfo.id} />
        </Container>
    )
}

export { TalentProfile };