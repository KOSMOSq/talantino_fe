import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const LinkTab = props => {
    return <Tab component={NavLink} {...props} />;
};

const LinkTabs = ({ tabs }) => {
    const params = useParams();
    const [value, setValue] = useState(
        tabs.indexOf(tabs.find(item => item.href === params["*"]))
    );

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Link tabs"
                >
                    {tabs.map(tab => (
                        <LinkTab
                            sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}
                            key={tab.label}
                            label={tab.label}
                            to={tab.href}
                        />
                    ))}
                </Tabs>
            </Box>
        </>
    );
};

export { LinkTabs };
