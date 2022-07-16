import { FC, useState, useEffect, useCallback, useMemo } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import ThemeProvider from "theme/ThemeProvider";
import routes from "router/Router";
import { Web3ReactProvider } from "@web3-react/core";
//import Web3 from "web3/dist/web3.min.js";
import Web3 from 'web3';

import SidebarToggledContext from "contexts/SidebarToggledContext";
import NotificationContext from "contexts/NotificationContext";
import LanguageContext from "contexts/LanguageContext";

type MessageType = {
    title: string,
    content: string,
    date: number,
};

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
    const [lang, setLang] = useState<string>("en-US");
    const [multiLang, setMultiLang] = useState<any>(null);
    const [sidebarToggled, setSidebarToggled] = useState<boolean>(lgUp);
    const [notification, setNotification] = useState<Array<MessageType>>();
    const toggleSidebar = useCallback(() => setSidebarToggled(!sidebarToggled), [sidebarToggled]);

    useEffect(() => {
        const fetchJSON = async (appointedLang: string) => {
            if (appointedLang !== "en-US" && appointedLang !== "zh-TW") {
                appointedLang = "en-US"; // set English as the default language
            }
            const appointedMultiLang = await import(`lang/${appointedLang}.json`);
            setMultiLang(appointedMultiLang);
        }
        if (lang) {
            fetchJSON(lang);
        } else {
            let oldLang = localStorage.getItem("_lang_");
            if (!oldLang) {
                oldLang = "en-US"; // set English as the default language
            }
            fetchJSON(oldLang);
        }
    }, [lang]);

    /* notification */
    const addNotification = useCallback((newMessage: MessageType): void => {
        if (notification) {
            setNotification([...notification, newMessage]);
        }
    }, [notification]);

    const deleteNotification = useCallback((idx: number): void => {
        if (notification) {
            notification.splice(idx, 1);
            setNotification(notification.slice());
        }
    }, [notification]);

    useEffect(() => {
        if (notification) {
            /* Store notification to local storage whenever `notification' changed */
            localStorage.setItem("_notifications_", JSON.stringify(notification));
        }
    }, [notification]);

    useEffect(() => {
        const notificationString = localStorage.getItem("_notifications_");
        if (notificationString === null) {
            setNotification([]);
        } else {
            try {
                const notification = JSON.parse(notificationString);
                setNotification(notification);
            } catch (error) {
                console.log("Cannot get notification: data corrupted");
                setNotification([]);
            }
        }
    }, []);

    return (
        <ThemeProvider>
            <LanguageContext.Provider
                value={{ lang, setLang, multiLang }}
            >
                <SidebarToggledContext.Provider
                    value={{ sidebarToggled, toggleSidebar }}
                >
                    <NotificationContext.Provider
                        value={{ notification: notification ?? [], addNotification, deleteNotification }}
                    >
                        <CssBaseline />
                        <Web3ReactProvider getLibrary={getLibrary}>{router}</Web3ReactProvider>
                    </NotificationContext.Provider>
                    
                </SidebarToggledContext.Provider>
            </LanguageContext.Provider>
        </ThemeProvider>
    );
};

export { MainComponentWrapper };
export default App;