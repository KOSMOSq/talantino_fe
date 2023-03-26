import { Container } from "@mui/material";
import { testTalent } from "../../common/common";
// ! uncomment when backend will done
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { talentsAPI } from "../../api/talentsAPI";
import { SideBar } from "./components/SideBar";
import { MainContent } from "./components/MainContent";

function TalentProfile() {
  //! replace testTalent to talentInfo when backend will done
  //const [talentInfo, setTalentInfo] = useState();
  
  //! will use it in request all profile info
  // const { talentId } = useParams();
  
  // ! uncomment when backend will done
  // useEffect(() => {
  //   const getTalent = async () => {
  //     const response = await talentsAPI.getTalent(talentId);
  //     setTalentInfo(response);
  //   }
  //   getTalent().catch(error => console.log(error))
  // }, [])

  // if (!talentInfo) {
  //   return <h1>none</h1>
  // }
  
  return (
    <Container sx={{ display: "flex", flexDirection: "row", height: 1800 }}>
      <SideBar talentInfo={testTalent} />
      <MainContent talentDescription={testTalent.description} />
    </Container>
  )
}

export { TalentProfile };