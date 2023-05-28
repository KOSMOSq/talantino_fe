import { useSelector } from "react-redux";
import { Talents } from "./Talents";
import { AdminTalents } from "../admin/AdminTalents/AdminTalents";

const TalentsContainer = () => {
    const role = useSelector(store => store.auth.user.role);

    return role ? (
        role === "ADMIN" ? (
            <AdminTalents />
        ) : (
            <Talents />
        )
    ) : (
        <Talents />
    );
};

export { TalentsContainer };
