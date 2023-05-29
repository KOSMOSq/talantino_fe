import { useSelector } from "react-redux";
import Proofs from "./Proofs";
import { AdminProofs } from "../admin/AdminProofs/AdminProofs";

const ProofsContainer = () => {
    const role = useSelector(store => store.auth.user.role);

    return role && role === "ADMIN" ? <AdminProofs /> : <Proofs />;
};

export { ProofsContainer };
