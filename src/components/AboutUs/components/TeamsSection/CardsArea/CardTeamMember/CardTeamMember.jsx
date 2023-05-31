import { Paper, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const CardTeamMember = ({ photo, fullName, studyPlace }) => {
    return (
        <Card
            sx={{
                height: "389px",
                width: "308px",
                borderRadius: "30px",
                position: "relative"
            }}
        >
            <CardMedia
                sx={{ height: "290px" }}
                component="img"
                image={photo}
                alt="Photo"
            />
            <Paper
                sx={{
                    bottom: "0px",
                    height: "127px",
                    width: "308px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "absolute",
                    borderRadius: "30px",
                    bgcolor: "#F4FBFF"
                }}
            >
                <Typography variant="h5" component="div">
                    {fullName}
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    fontSize={"20px"}
                    color={"#9C9C9C"}
                >
                    {studyPlace}
                </Typography>
            </Paper>
        </Card>
    );
};

export { CardTeamMember };
