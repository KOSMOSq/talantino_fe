import { Box, Grid, List } from "@mui/material";
import { TalentCard } from "../../../TalentCard";
import { ChangeViewButton } from "../../../ChangeViewButton";
import { useSelector } from "react-redux";
import { TalentListItem } from "../../../TalentListItem";

const TalentsArea = () => {
    const talents = useSelector(store => store.talents.talents);
    const talentsView = useSelector(store => store.talents.talentsView);

    return (
        <>
            <Box zIndex={1} position={"absolute"} right={80} mt={"15px"} mb={"15px"}>
                <ChangeViewButton />
            </Box>

            {talentsView == "grid" ? 
                <Box display="flex" justifyContent="center" pt={4}>
                    <Grid container item
                        sm={12}
                        md={12}
                        lg={12}
                        xl={9}
                        spacing={2}
                        display="flex"
                        justifyContent="center">
                        {talents.map(element => {
                            return (
                                <Grid item key={element.id}>
                                    <TalentCard {...element} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box> :
                <Box display="flex" justifyContent="center" pt={2}>
                    <List sx={{width: "700px"}}>
                    {talents.map(element => {
                        return (
                            <Grid item key={element.id}>
                                <TalentListItem {...element} />
                            </Grid>
                        );
                    })}
                </List>
                </Box>
            }
        </>
    );
};

export { TalentsArea };