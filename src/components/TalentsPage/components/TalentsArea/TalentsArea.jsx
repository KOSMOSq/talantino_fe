import { Box, Grid } from "@mui/material";
import { TalentCard } from "../../../TalentCard";
import { ChangeViewButton } from "../../../ChangeViewButton";

const TalentsArea = ({ talents }) => {
    return (
        <>
            <Box zIndex={1} position={"absolute"} right={80} mt={"15px"} mb={"15px"}>
                {/* handleChange will change view of talets */}
                <ChangeViewButton handleChange={() => 1} />
            </Box>
            <Box display="flex" justifyContent="center" pt={4}>
                <Grid container item
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    spacing={2}
                    display="flex"
                    justifyContent="center"
                >
                    {talents.map(element => {
                        return (
                            <Grid item key={element.id}>
                                <TalentCard {...element} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </>
    );
};

export { TalentsArea };