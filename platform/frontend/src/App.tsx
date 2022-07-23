import { FC, useState, useEffect, useCallback, useMemo } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import ThemeProvider from "theme/ThemeProvider";
import routes from "router/Router";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
//import Web3 from "web3/dist/web3.min.js";
import Web3 from 'web3';
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract"

import contractsInfo from "challenges/contracts.json";

import WaitEffectContext from "contexts/WaitEffectContext";
import SidebarToggledContext from "contexts/SidebarToggledContext";
import NotificationContext from "contexts/NotificationContext";
import Web3Context from "contexts/Web3Context";
import LanguageContext from "contexts/LanguageContext";
import { fontFamily } from "@mui/system";

/* Types */
type MessageType = {
    idx: number,
    date: number,
};

/* Constants */
const getLibrary = (provider: any) => {
    return new Web3(provider);
};
const web3 = new Web3(Web3.givenProvider);

/* Styled Components */
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
    /* Language */
    const [lang, setLang] = useState<string>(localStorage.getItem("_lang_") ?? "en-US");
    const [multiLang, setMultiLang] = useState<any>(null);
    const changeLang = useCallback((newLang: string) => {
        setLang(newLang);
        localStorage.setItem("_lang_", newLang);
    }, []);
    /* Sidebar */
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const [sidebarToggled, setSidebarToggled] = useState<boolean>(lgUp);
    /* Notifications */
    const [notification, setNotification] = useState<MessageType[]>();
    const toggleSidebar = useCallback(() => setSidebarToggled(!sidebarToggled), [sidebarToggled]);
    /* Web3 */
    const [solved, setSolved] = useState<boolean[]>([false, false, false, false, false, false]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    /* Wait Effect */
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    /* Language */
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
    /* Notifications */
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
    /* Contracts */
    const initContracts = useCallback(async (account: string) => {
        if (account) {
            const problemNum: number = Number(process.env.REACT_APP_PROBLEM_NUM);
            const solvedTmp: boolean[] = [];
            const contractsTmp: Contract[] = [];
            for (let i = 0; i < problemNum; i++) {
                const contract: Contract = new web3.eth.Contract(
                    contractsInfo[i]["abi"] as AbiItem[],
                    contractsInfo[i]["addr"]
                );

                /* use function closure to preserve index */
                await (async (idx: number) => {
                    /* call contract apis and add events */
                    const tf = await contract.methods
                        .addressToSolved(account)
                        .call({ from: account });

                    solvedTmp.push(tf);
                    /* Add event handlers */
                    contract.events
                        .hadSolved({ filter: { _solver: account } })
                        .on("data", (log: any) => {
                            setSolved([...solved.slice(0, idx), true, ...solved.slice(idx + 1)])
                        });
                    contract.events
                        .newSolved({ filter: { _solver: account } })
                        .on("data", (log: any) => {
                            setSolved([...solved.slice(0, idx), true, ...solved.slice(idx + 1)])
                        });
                    
                    contractsTmp.push(contract);
                })(i);
            }
            setSolved(solvedTmp);
            setContracts(contractsTmp);
        }
    }, []);

    return (
        <ThemeProvider>
            <LanguageContext.Provider
                value={{ lang, multiLang, changeLang }}
            >
                <NotificationContext.Provider
                    value={{ notification: notification ?? [], addNotification, deleteNotification }}
                >
                    <Web3Context.Provider
                        value={{ contracts, solved, initContracts }}
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
                    </Web3Context.Provider>

                </NotificationContext.Provider>
            </LanguageContext.Provider>
        </ThemeProvider>
    );
};

export { MainComponentWrapper };
export default App;
