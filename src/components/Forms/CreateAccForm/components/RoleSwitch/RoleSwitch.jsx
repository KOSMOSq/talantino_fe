import { Switch, Typography } from "@mui/material";

const RoleSwitch = ({ checkedTalent, handleSwitch }) => {
    return (
        <>
            <Typography>Sponsor</Typography>
            <Switch checked={checkedTalent} onChange={handleSwitch} />
            <Typography>Talent</Typography>
        </>
    );
};

export { RoleSwitch };
