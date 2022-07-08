import { FC, ReactNode, useState } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import ThemeProvider from "theme/ThemeProvider";
import routes from "router/Router";
import SidebarToggledContext from "contexts/SidebarToggledContext";
import { Web3ReactProvider } from "@web3-react/core";
//import Web3 from "web3/dist/web3.min.js";
import Web3 from 'web3';
import { string } from "prop-types";

const getLibrary = (provider: any) => {
    return new Web3(provider);
};

const MainComponentWrapper = styled(Box)(
    ({ theme }) => ({
        top: theme.header.height,
        position: "absolute",
        display: "flex",
        height: `calc(100% - ${theme.header.height})`,
        justifyContent: "center",
        alignItems: "stretch",
        alignContent: "center",
    })
);

const App: FC = () => {
    /* Use javascript object (rather than <Routes>) to define routes */
    const router = useRoutes(routes);

    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const [sidebarToggled, setSidebarToggled] = useState<boolean>(lgUp);
    const toggleSidebar = () => setSidebarToggled(!sidebarToggled);

    return (
        <ThemeProvider>
            <SidebarToggledContext.Provider
                value={{ sidebarToggled, toggleSidebar }}
            >
                <CssBaseline />
                <Web3ReactProvider getLibrary={getLibrary}>{router}</Web3ReactProvider>
            </SidebarToggledContext.Provider>
        </ThemeProvider>
    );
};

export { MainComponentWrapper };
export default App;