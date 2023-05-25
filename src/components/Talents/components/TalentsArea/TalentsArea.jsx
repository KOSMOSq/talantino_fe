import { Box, Grid, List } from "@mui/material";
import { useSelector } from "react-redux";
import { TalentListCard } from "../TalentListCard/TalentListCard";
import { TalentGridCard } from "../TalentGridCard/TalentGridCard";

const TalentsArea = ({ talents, isLoading }) => {
    const talentsView = useSelector(store => store.talents.talentsView);
    if (talents.length === 0 || (talents.length !== 9 && isLoading)) {
        talents = Array(9).fill({});
    }
    const talentItems =
        talentsView === "grid"
            ? talents.map((element, index) => {
                  return (
                      <TalentGridCard
                          isLoading={isLoading}
                          {...element}
                          key={index}
                      />
                  );
              })
            : talents.map((element, index) => {
                  return (
                      <TalentListCard
                          isLoading={isLoading}
                          {...element}
                          key={index}
                      />
                  );
              });

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
                        {talentItems}
                    </Grid>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center">
                    <List sx={{ width: "700px", pt: 0 }}>{talentItems}</List>
                </Box>
            )}
        </>
    );
};

export { TalentsArea };
