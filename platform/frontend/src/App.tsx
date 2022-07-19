import { FC, useState, useEffect, useCallback, useMemo } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import ThemeProvider from "theme/ThemeProvider";
import routes from "router/Router";
import { Web3ReactProvider } from "@web3-react/core";
//import Web3 from "web3/dist/web3.min.js";
import Web3 from 'web3';

import WaitEffectContext from "contexts/WaitEffectContext";
import SidebarToggledContext from "contexts/SidebarToggledContext";
import NotificationContext from "contexts/NotificationContext";
import LanguageContext from "contexts/LanguageContext";

type MessageType = {
    idx: number,
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
    const [lang, setLang] = useState<string>(localStorage.getItem("_lang_") ?? "en-US");
    const [multiLang, setMultiLang] = useState<any>(null);
    const [sidebarToggled, setSidebarToggled] = useState<boolean>(lgUp);
    const [notification, setNotification] = useState<Array<MessageType>>();
    const toggleSidebar = useCallback(() => setSidebarToggled(!sidebarToggled), [sidebarToggled]);
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchJSON = async (appointedLang: string) => {
            if (appointedLang !== "en-US" && appointedLang !== "zh-TW") {
                appointedLang = "en-US"; // set English as the default language
            }
            const appointedMultiLang = await import(`lang/${appointedLang}.json`);
            setMultiLang(appointedMultiLang);
        }
        fetchJSON(lang);
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
                value={{
                    lang, multiLang, changeLang: (newLang: string) => {
                        setLang(newLang);
                        localStorage.setItem("_lang_", newLang);
                    }
                }}
            >
                <NotificationContext.Provider
                    value={{ notification: notification ?? [], addNotification, deleteNotification }}
                >
                    <SidebarToggledContext.Provider
                        value={{ sidebarToggled, toggleSidebar }}
                    >
                        <CssBaseline />

                        <WaitEffectContext.Provider
                            value={{
                                showBackDrop,
                                showSnackBar,
                                successMessage,
                                errorMessage,
                                setShowBackDrop,
                                setShowSnackBar,
                                setSuccessMessage,
                                setErrorMessage,
                            }}
                        >

                            <Web3ReactProvider getLibrary={getLibrary}>{router}</Web3ReactProvider>
                        </WaitEffectContext.Provider>

                    </SidebarToggledContext.Provider>
                </NotificationContext.Provider>
            </LanguageContext.Provider>
        </ThemeProvider>
    );
};

export { MainComponentWrapper };
export default App;
