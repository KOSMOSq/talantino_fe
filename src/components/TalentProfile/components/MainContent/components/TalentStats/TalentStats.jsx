import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const TalentStats = ({ talentId }) => {
    const id = useSelector(store => store.auth.user.id);

    if (Number(talentId) !== id) {
        return <Navigate to={`/talent/${talentId}/`} />;
    }

    return (
        <>
            1. Total amount of recieved kudos. 2. Skill that was marked by kudos
            the most. 3. Proof that was marked by kudos the most.
        </>
    );
};

export { TalentStats };
