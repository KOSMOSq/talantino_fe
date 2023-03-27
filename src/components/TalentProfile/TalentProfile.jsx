import { Container, LinearProgress } from "@mui/material";
import { testTalent } from "../../common/common";
// ! uncomment when backend will done
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { talentsAPI } from "../../api/talentsAPI";
// import { useLocation } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { MainContent } from "./components/MainContent";
import { Box } from "@mui/material";

function TalentProfile() {
    //! replace testTalent to talentInfo when backend will done
    // const [talentInfo, setTalentInfo] = useState();

    //! will use it in request all profile info
    // const { talentId } = useParams();
    // const location = useLocation();

    // ! uncomment when backend will done
    // useEffect(() => {
    //   const getTalent = async () => {
    //     const response = await talentsAPI.getTalent(talentId);
    //     setTalentInfo(response);
    //   }
    //   getTalent().catch(error => console.log(error))
    // }, [location]);

    // if (!talentInfo) {
    //     return <Box sx={{ width: "100%" }}>
    //         <LinearProgress />
    //     </Box>
    // }

    return (
        <Container sx={{ display: "flex", flexDirection: "row", paddingLeft: "24px", paddingRight: "24px" }}>
            <SideBar talentInfo={testTalent} />
            <MainContent talentDescription={testTalent.description} talentId={testTalent.id} />
        </Container>
    )
}

export { TalentProfile };