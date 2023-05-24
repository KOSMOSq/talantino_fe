import {
    ClickAwayListener,
    Grow,
    MenuList,
    Paper,
    Popper
} from "@mui/material";

const Menu = ({ open, anchorEl, children, handleClose, transformOrigin }) => {
    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            transition
        >
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: transformOrigin
                    }}
                >
                    <Paper elevation={4}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>{children}</MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};

export { Menu };
