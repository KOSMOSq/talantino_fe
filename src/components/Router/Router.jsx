import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

import { Layout } from "./components/Layout/Layout";
import { CreateAccForm } from "../Forms/CreateAccForm/CreateAccForm";
import Settings from "../Settings/Settings";
import TalentProfile from "../TalentProfile/TalentProfile";
import { Page404 } from "./components/Page404/Page404";
import { EmailConfirm } from "../EmailConfirm/EmailConfirm";
import SponsorProfile from "../SponsorProfile/SponsorProfile";
import { Recover } from "../Recover/Recover";
import { TalentsContainer } from "../Talents/TalentsContainer";
import { ProofsContainer } from "../Proofs/ProofsContainer";
import { Kinds } from "../admin/Kinds/Kinds";
import { useSelector } from "react-redux";
import { Welcome } from "../Welcome/Welcome";

function Router() {
    const isAuth = useSelector(store => store.auth.isAuth);
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            isAuth ? <Navigate to="/talents" /> : <Welcome />
                        }
                    />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="proofs" element={<ProofsContainer />} />
                    <Route path="talents" element={<TalentsContainer />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route path="create-acc" element={<CreateAccForm />} />
                    <Route
                        path="talent/:talentId/*"
                        element={<TalentProfile />}
                    />
                    <Route
                        path="sponsor/:sponsorId/*"
                        element={<SponsorProfile />}
                    />
                    <Route path="settings" element={<Settings />} />
                    <Route path="email-confirm" element={<EmailConfirm />} />
                    <Route path="account-recover" element={<Recover />} />
                    <Route path="kinds" element={<Kinds />} />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export { Router };
