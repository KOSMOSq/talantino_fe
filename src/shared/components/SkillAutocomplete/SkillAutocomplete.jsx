import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsThunk } from "../../../redux/reducers/skillsReducer";
import { useEffect } from "react";

const SkillAutocomplete = ({ defaultSkills = [], onChange, error = null, value }) => {
    const skills = useSelector(store => store.skills.skills);
    const dispatch = useDispatch();

    const skillsLabels = skills.map(item => item.label);
    defaultSkills = defaultSkills.filter(item =>
        skillsLabels.includes(item.label)
    );

    useEffect(() => {
        if (skills.length === 0) {
            dispatch(getSkillsThunk());
        }
    }, []);

    const onSearch = (options, state) => {
        const query = state.inputValue.toLowerCase();
        return options
            .filter(item => {
                return item.label.toLowerCase().includes(query);
            })
            .sort((a, b) => {
                const aLabel = a.label.toLowerCase();
                const bLabel = b.label.toLowerCase();

                if (aLabel.startsWith(query) && bLabel.startsWith(query)) {
                    return 0;
                } else if (
                    aLabel.startsWith(query) &&
                    !bLabel.startsWith(query)
                ) {
                    return -1;
                } else {
                    return 1;
                }
            });
    };

    return (
        <>
            {skills.length === 0 ? null : (
                <Autocomplete
                    value={value.map(item =>
                        skills.find(lowerItem => item === lowerItem.label)
                    )}
                    sx={{
                        width: "100%",
                        height: "auto",
                        marginBottom: "10px"
                    }}
                    loading={skills.length === 0}
                    multiple
                    id="tags-outlined"
                    options={skills}
                    filterOptions={onSearch}
                    isOptionEqualToValue={(option, value) => {
                        return option.label === value.label;
                    }}
                    defaultValue={defaultSkills.map(item =>
                        skills.find(lowerItem => item.label === lowerItem.label)
                    )}
                    filterSelectedOptions
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            return (
                            <Chip
                                label={option.label}
                                icon={
                                    <img
                                        src={option.icon}
                                        width="18"
                                        alt="skill"
                                    />
                                }
                                size="small"
                                {...getTagProps({ index })}
                            />
                        )})
                    }
                    renderInput={params => {
                        return (
                            <TextField
                                {...params}
                                placeholder="Add skills"
                                error={Boolean(error)}
                                helperText={error?.message}
                            />
                        );
                    }}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <Box display="flex" gap={1}>
                                <img src={option.icon} width="26" alt="skill" />
                                <Typography>{option.label}</Typography>
                            </Box>
                        </li>
                    )}
                    onChange={(e, data) => {
                        onChange(data.map(data => data.label));
                        return data;
                    }}
                />
            )}
        </>
    );
};

export { SkillAutocomplete };
