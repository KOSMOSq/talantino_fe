import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

import { Talents } from "../Talents/Talents";
import { Layout } from "./components/Layout/Layout";
import { CreateAccForm } from "../Forms/CreateAccForm/CreateAccForm";
import Settings from "../Settings/Settings";
import TalentProfile from "../TalentProfile/TalentProfile";
import Proofs from "../Proofs/Proofs";
import { Page404 } from "./components/Page404/Page404";
import { EmailConfirm } from "../EmailConfirm/EmailConfirm";
import SponsorProfile from "../SponsorProfile/SponsorProfile";
import { Recover } from "../Recover/Recover";
import { TalentsContainer } from "../Talents/TalentsContainer";

function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/talents" />} />
                    <Route path="proofs" element={<Proofs />} />
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
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export { Router };
