import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const LinkTab = props => {
    return <Tab component={NavLink} {...props} />;
};

const LinkTabs = ({ tabs }) => {
    const params = useParams();
    const findTab = tabs.indexOf(tabs.find(item => item.href === params["*"]));
    const [value, setValue] = useState(findTab === -1 ? 0: findTab);

    useEffect(() => {
        const findTab = tabs.indexOf(tabs.find(item => item.href === params["*"]));
        setValue(findTab === -1 ? 0: findTab);
    }, [params]);

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
