import { Box, Grid, List } from "@mui/material";
import { useSelector } from "react-redux";
import { TalentListCard } from "../TalentListCard/TalentListCard";
import { TalentGridCard } from "../TalentGridCard/TalentGridCard";

const TalentsArea = () => {
    const talents = useSelector(store => store.talents.talents);
    const talentsView = useSelector(store => store.talents.talentsView);

    return (
        <>
            {talentsView === "grid" ? (
                <Box display="flex" justifyContent="center">
                    <Grid
                        container
                        item
                        sm={12}
                        md={12}
                        lg={12}
                        xl={9}
                        spacing={2}
                        display="flex"
                        justifyContent="center"
                    >
                        {talents.map(element => {
                            return (
                                <Grid item key={element.id}>
                                    <TalentGridCard {...element} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center">
                    <List sx={{ width: "700px", pt: 0 }}>
                        {talents.map(element => {
                            return (
                                <Grid item key={element.id}>
                                    <TalentListCard {...element} />
                                </Grid>
                            );
                        })}
                    </List>
                </Box>
            )}
        </>
    );
};

export { TalentsArea };
