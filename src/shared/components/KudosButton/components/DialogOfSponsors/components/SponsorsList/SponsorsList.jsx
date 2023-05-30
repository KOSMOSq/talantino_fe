import {
    Avatar,
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { ReactComponent as KudosIconActive } from "../../../../../../../assets/icons/kudosIconActive.svg";

const SponsorsList = ({
    isLoading,
    info,
    handleClickOpen,
    page,
    totalPages
}) => {
    return (
        <List
            sx={{
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 0,
                paddingBottom: 3,
                height: "12rem"
            }}
        >
            {isLoading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress size={60} />
                </Box>
            ) : info.length === 0 ? (
                <Typography align="center">
                    {"Nobody send kudos on this proof yet :("}
                </Typography>
            ) : (
                <InfiniteScroll
                    dataLength={info.length}
                    next={handleClickOpen}
                    hasMore={page < totalPages}
                    scrollableTarget="scrollList"
                >
                    {info.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                sx={
                                    index === 0
                                        ? { paddingTop: 0 }
                                        : { paddingTop: 1 }
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={item.sponsor.avatar}
                                        alt={item.sponsor.name}
                                    >
                                        {item.sponsor.name.slice(0, 1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        item.sponsor.name +
                                        " " +
                                        item.sponsor.surname
                                    }
                                />
                                <ListItemText
                                    primary={item.amountOfKudos}
                                    align="right"
                                    sx={{ marginRight: 1 }}
                                />
                                <KudosIconActive />
                            </ListItem>
                        );
                    })}
                </InfiniteScroll>
            )}
        </List>
    );
};

export { SponsorsList };
