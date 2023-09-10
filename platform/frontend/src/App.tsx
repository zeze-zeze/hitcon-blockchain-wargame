import { FC, useState, useEffect, useCallback, useMemo } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Confetti from "react-confetti";
import { styled, useTheme } from "@mui/material/styles";
import ThemeProvider from "theme/ThemeProvider";
import routes from "router/Router";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
//import Web3 from "web3/dist/web3.min.js";
import Web3 from 'web3';
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract"

import contractsInfo from "share/contracts.json";

import EffectContext from "contexts/EffectContext";
import SidebarToggledContext from "contexts/SidebarToggledContext";
import NotificationContext from "contexts/NotificationContext";
import Web3Context from "contexts/Web3Context";
import LanguageContext from "contexts/LanguageContext";
import useDocumentDimension from "hooks/useDocumentDimension";

/* Types */
type MessageType = {
    idx: number,
    date: number,
};

/* Constants */
const getLibrary = (provider: any) => {
    return new Web3(provider);
};

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
    const [solved, setSolved] = useState<boolean[]>();
    const [contracts, setContracts] = useState<Contract[]>([]);
    /* Wait Effect */
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

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
            /* Prevent localstorage corruption */
            try {
                const notification = JSON.parse(notificationString);
                setNotification(notification);
            } catch (error) {
                console.log("Cannot get notification: data corrupted");
                setNotification([]);
            }
        }
    }, []);
    /* Solved problems */
    const addSolved = useCallback((idx: number): void => {
        /* Fix the circling dependency problem by procuring the array from localStorage*/
        let newSolved: boolean[];
        const solvedStr = localStorage.getItem("_solved_");
        if (solvedStr === null) {
            newSolved = Array(Number(process.env.REACT_APP_CHALLENGE_NUM)).fill(false);
        } else {
            /* Prevent localstorage corruption */
            try {
                newSolved = JSON.parse(solvedStr);
            } catch (error) {
                newSolved = Array(Number(process.env.REACT_APP_CHALLENGE_NUM)).fill(false);
            }
        }
        newSolved[idx] = true;
        setSolved(newSolved);
    }, [solved]);
    useEffect(() => {
        const solvedStr = localStorage.getItem("_solved_");
        if (solvedStr === null) {
            setSolved(Array(Number(process.env.REACT_APP_CHALLENGE_NUM)).fill(false));
        } else {
            /* Prevent localstorage corruption */
            try {
                const solved = JSON.parse(solvedStr);
                setSolved(solved);
            } catch (error) {
                console.log("Cannot get notification: data corrupted");
                setSolved(Array(Number(process.env.REACT_APP_CHALLENGE_NUM)).fill(false));
            }
        }
    }, []);
    useEffect(() => {
        if (solved) {
            /* Store notification to local storage whenever `notification' changed */
            localStorage.setItem("_solved_", JSON.stringify(solved));
        }
    }, [solved]);
    /* Contracts */
    const initContracts = useCallback(async (account: string) => {
        if (account) {
            const web3 = new Web3(Web3.givenProvider);
            const challengeNum: number = Number(process.env.REACT_APP_CHALLENGE_NUM);
            const contractsTmp: Contract[] = [];
            const solvedTmp: boolean[] = [];
            for (let i = 0; i < challengeNum; i++) {

                /* Initialize contract */
                const contract: Contract = new web3.eth.Contract(
                    contractsInfo[i]["abi"] as AbiItem[],
                    contractsInfo[i]["addr"]
                );

                await (async () => {
                    /* Call contract apis to get currently solved challenges */
                    const tf = await contract.methods
                        .addressToSolved(account)
                        .call({ from: account });

                    solvedTmp.push(tf);
                })();

                /* Add event handlers */
                contract.events
                    .hadSolved({ filter: { _solver: account } })
                    .on("data", (log: any) => {
                        setErrorMessage(multiLang?.error.alreadySolved);
                        setShowSnackBar(2);
                    })
                    .on("error", (error: Error) => {
                        setErrorMessage(error.message);
                        setShowSnackBar(2);
                    });
                contract.events
                    .newSolved({ filter: { _solver: account } })
                    .on("data", (log: any) => {
                        setSuccessMessage(multiLang?.success.challengeSolved);
                        setShowSnackBar(1);
                        addNotification({
                            idx: i,
                            date: Date.now(),
                        });
                        addSolved(i);
                        setTimeout(() => {
                            window.location.href = "/challenges";
                        }, 2000);
                    })
                    .on("error", (error: Error) => {
                        setErrorMessage(error.message);
                        setShowSnackBar(2);
                    });

                contractsTmp.push(contract);
            }
            setContracts(contractsTmp);
            setSolved(solvedTmp);
        }
    }, [multiLang, notification]);

    /* Confetti */
    const { width, height } = useDocumentDimension();

    return (
        <ThemeProvider>
            <LanguageContext.Provider
                value={{ lang, multiLang, changeLang }}
            >
                <NotificationContext.Provider
                    value={{ notification: notification ?? [], addNotification, deleteNotification }}
                >
                    <Web3Context.Provider
                        value={{ 
                            contracts,
                            solved: solved ?? Array(Number(process.env.REACT_APP_CHALLENGE_NUM)).fill(false),
                            initContracts
                        }}
                    >

                        <CssBaseline />
                        <SidebarToggledContext.Provider
                            value={{ sidebarToggled, toggleSidebar }}
                        >
                            <EffectContext.Provider
                                value={{
                                    showBackDrop,
                                    showSnackBar,
                                    successMessage,
                                    errorMessage,
                                    showConfetti,
                                    setShowBackDrop,
                                    setShowSnackBar,
                                    setSuccessMessage,
                                    setErrorMessage,
                                    setShowConfetti
                                }}
                            >
                                <Confetti
                                    width={width}
                                    height={height}
                                    numberOfPieces={showConfetti ? 400 : 0}
                                    style={{
                                        zIndex: 1250 // in Material UI, drawer's z-index is 1200 and modal's z-index is 1300
                                    }}
                                />
                                <Web3ReactProvider getLibrary={getLibrary}>{router}</Web3ReactProvider>
                            </EffectContext.Provider>
                        </SidebarToggledContext.Provider>
                    </Web3Context.Provider>
                </NotificationContext.Provider>
            </LanguageContext.Provider>
        </ThemeProvider>
    );
};

export { MainComponentWrapper };
export default App;
