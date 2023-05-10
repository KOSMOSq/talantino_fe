import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsThunk } from "../../../redux/reducers/skillsReducer";
import { useEffect } from "react";

const SkillAutocomplete = ({ defaultSkills = [], onChange, error = null }) => {
    const skills = useSelector(store => store.skills.skills);
    const dispatch = useDispatch();

    useEffect(() => {
        if (skills.length === 0) {
            dispatch(getSkillsThunk());
        }
    }, []);

    return (
        <>
        {skills.length === 0 ? null :<Autocomplete
            sx={{
                width: "100%",
                height: "auto",
                marginBottom: "10px"
            }}
            loading={skills.length === 0}
            multiple
            id="tags-outlined"
            options={skills}
            defaultValue={defaultSkills.map(item =>
                skills.find(lowerItem => item.label === lowerItem.label)
            )}
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        label={option.label}
                        icon={<img src={option.icon} width="18" alt="skill"/>}
                        size="small"
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={params => {
                return <TextField {...params} placeholder="Add skills" error={Boolean(error)} helperText={error?.message}/>;
            }}
            renderOption={(props, option) => (
                <li {...props}>
                    <Box display="flex" gap={1}>
                        <img src={option.icon} width="26" alt="skill"/>
                        <Typography>{option.label}</Typography>
                    </Box>
                </li>
            )}
            onChange={(e, data) => {
                onChange(data.map(data => data.label));
                return data;
            }}
        />}
        </>
    );
};

export { SkillAutocomplete };
