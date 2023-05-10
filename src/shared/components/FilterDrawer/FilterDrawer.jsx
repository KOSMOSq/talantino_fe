import TuneIcon from "@mui/icons-material/Tune";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
    SwipeableDrawer,
    ToggleButton,
    Box,
    IconButton,
    Divider,
    Button,
    Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SkillAutocomplete } from "../SkillAutocomplete/SkillAutocomplete";
import { Controller, useForm } from "react-hook-form";
import { setFilterSkills } from "../../../redux/reducers/skillsReducer";

const FilterDrawer = ({ setQuery }) => {
    const [open, setOpen] = useState(false);
    const filterSkills = useSelector(store => store.skills.filterSkills).map(
        item => {
            return { label: item };
        }
    );
    const page = useSelector(store => store.talents.currentPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm({
        mode: "all",
        defaultValues: {
            skills: []
        }
    });

    const handleDrawerClose = () => {
        setOpen(prev => !prev);
    };

    const handleFilter = data => {
        //page reload when click submit with skill from redux in autocomplete (when you dont match skill but it self set from redux)
        if (data.skills.length) {
            console.log(data.skills);
            const skills = encodeURIComponent(data.skills.join("%2C"));
            setQuery(skills);
            handleDrawerClose();
            //maybe it is solution
            navigate(`/talents?page=${page}&skills=${skills}`);
            setTimeout(() => dispatch(setFilterSkills(data.skills)), 1000);
            return;
        } else {
            dispatch(setFilterSkills([]));
            setQuery("");
            navigate(`/talents?page=${page}`);
            handleDrawerClose();
        }
    };

    return (
        <Box>
            <ToggleButton
                value="filter"
                size="small"
                onClick={handleDrawerClose}
            >
                <TuneIcon sx={{ color: "rgba(0, 0, 0, 0.87)" }} />
            </ToggleButton>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                onOpen={handleDrawerClose}
            >
                <Box width="400px">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mr: 2,
                            ml: 2
                        }}
                    >
                        <Typography variant="h6">
                            Filter talents by skills
                        </Typography>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon
                                sx={{ color: "rgba(0, 0, 0, 0.87)" }}
                            />
                        </IconButton>
                    </Box>
                    <Divider />
                    <form onSubmit={handleSubmit(handleFilter)}>
                        <Box
                            m={5}
                            mt={2}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <SkillAutocomplete
                                        onChange={onChange}
                                        defaultSkills={filterSkills}
                                    />
                                )}
                            />

                            {/* <SkillAutocomplete
                            onChange={handleChange}
                            defaultSkills={value.map(item => {
                                return { label: item };
                            })}
                        /> */}
                            <Box mt={10} display="flex" gap={2}>
                                <Button variant="contained">
                                    Clean the filter
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    //disabled={value.length === 0}
                                >
                                    Filter
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </SwipeableDrawer>
        </Box>
    );
};

export { FilterDrawer };
