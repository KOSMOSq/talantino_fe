import { Chip } from "@mui/material";

const SkillChip = ({ icon, label, handleDelete }) => {

    return (
        <>
            <Chip icon={icon} label={label} size="small" onDelete={handleDelete} />
        </>
    );
};

export { SkillChip };
