import TuneIcon from "@mui/icons-material/Tune";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
    SwipeableDrawer,
    ToggleButton,
    Box,
    IconButton,
    Divider,
    TextField,
    Button
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FilterDrawer = ({ setQuery }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const page = useSelector(store => store.talents.currentPage);
    const navigate = useNavigate();

    const handleDrawerClose = () => {
        setOpen(prev => !prev);
    };

    const handleFilter = () => {
        if (value) {
            const query = encodeURIComponent(value.join("%2C"));
            setQuery(query);
            handleDrawerClose();
            navigate(`/talents?page=${page}&skills=${query}`);
        }
        handleDrawerClose();
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
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mr: 2
                    }}
                >
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon
                            sx={{ color: "rgba(0, 0, 0, 0.87)" }}
                        />
                    </IconButton>
                </Box>
                <Divider />
                <Box
                    m={10}
                    mt={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <TextField
                        placeholder="Autocomplete"
                        onChange={e => setValue([e.target.value])}
                    ></TextField>
                    <Button
                        variant="contained"
                        sx={{ mt: 10 }}
                        onClick={handleFilter}
                    >
                        Filter
                    </Button>
                </Box>
            </SwipeableDrawer>
        </Box>
    );
};

export { FilterDrawer };
