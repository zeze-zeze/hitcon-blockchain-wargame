import { FC, useContext } from "react";
import { Avatar, Grid, Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import axios from "axios";
import useSolvedProblems from "hooks/useSolvedProblems";
import { useTheme } from "@mui/material/styles";
import LanguageContext from "contexts/LanguageContext";
import WaitEffectContext from "contexts/WaitEffectContext";
import ContractsContext from "contexts/ContractsContext";

const HeaderNFTList: FC = () => {
    const { account, active } = useWeb3React();
    /*
    const [chal1State, setChal1State] = useState(false);
    const [chal2State, setChal2State] = useState(false);
    const [chal3State, setChal3State] = useState(false);
    const [chal4State, setChal4State] = useState(false);
    const [chal5State, setChal5State] = useState(false);
    const [chal6State, setChal6State] = useState(false);
    */

    const { solved } = useContext(ContractsContext);

    const {
        setShowBackDrop,
        setShowSnackBar,
        setSuccessMessage,
        setErrorMessage,
        showBackDrop
    } = useContext(WaitEffectContext);

    const { getSolvedProblems } = useSolvedProblems();
    const solvedProblems = getSolvedProblems();
    const theme = useTheme();
    const { multiLang } = useContext(LanguageContext);

    const nftImgLinks = [
        "https://i.imgur.com/fSFl7io.png",
        "https://i.imgur.com/OP9jv73.png",
        "https://i.imgur.com/VRYrAZ5.png",
        "https://i.imgur.com/IFRMdTA.png",
        "https://i.imgur.com/lgGrqE6.png",
        "https://i.imgur.com/yvn5IdB.png"
    ];

    /*
    const chal1Contract = new web3.eth.Contract(
        info["p1"]["abi"] as AbiItem[],
        info["p1"]["addr"]
    );
    const chal2Contract = new web3.eth.Contract(
        info["p2"]["abi"] as AbiItem[],
        info["p2"]["addr"]
    );
    const chal3Contract = new web3.eth.Contract(
        info["p3"]["abi"] as AbiItem[],
        info["p3"]["addr"]
    );
    const chal4Contract = new web3.eth.Contract(
        info["p4"]["abi"] as AbiItem[],
        info["p4"]["addr"]
    );
    const chal5Contract = new web3.eth.Contract(
        info["p5"]["abi"] as AbiItem[],
        info["p5"]["addr"]
    );
    const chal6Contract = new web3.eth.Contract(
        info["p5"]["abi"] as AbiItem[],
        info["p5"]["addr"]
    );
    */

    const requestNFT = async () => {
        setShowBackDrop(true);
        await axios
            .post(process.env.REACT_APP_BASE_API_URL + "/hitcon-nft-sender", {
                address: account,
            })
            .then((response) => {
                // console.log(response);
                setSuccessMessage("Request NFT Success");
                setShowSnackBar(1);
            })
            .catch((error) => {
                // console.log(error);
                setErrorMessage("ERROR! Request failed");
                setShowSnackBar(2);
            });
            setShowBackDrop(false);
    };

    /*
    useEffect(() => {
        if (account !== undefined) {
            chal1Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => setChal1State(t));
            chal2Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => setChal2State(t));
            chal3Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => setChal3State(t));
            chal4Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => setChal4State(t));
            chal5Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => setChal5State(t));
            chal6Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => setChal6State(t));
        }
    }, [account]);

    chal1Contract.events
        .hadSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal1State(true);
        });

    chal2Contract.events
        .hadSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal2State(true);
        });

    chal3Contract.events
        .hadSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal3State(true);
        });
    chal4Contract.events
        .hadSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal4State(true);
        });
    chal5Contract.events
        .hadSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal5State(true);
        });
    chal6Contract.events
        .hadSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal6State(true);
        });

    chal1Contract.events
        .newSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal1State(true);
        });

    chal2Contract.events
        .newSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal2State(true);
        });

    chal3Contract.events
        .newSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal3State(true);
        });
    chal4Contract.events
        .newSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal4State(true);
        });
    chal5Contract.events
        .newSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal5State(true);
        });
    chal6Contract.events
        .newSolved({ filter: { _solver: account } })
        .on("data", (log: any) => {
            setChal6State(true);
        });
    */

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" spacing={8}>
                {
                    solvedProblems.map((solved: boolean, idx: number) => (
                        <Grid item xs={1} key={idx}>
                            <Tooltip arrow title={multiLang?.problems.challenges[idx].title}>
                                <Avatar
                                    variant="rounded"
                                    src={nftImgLinks[idx]}
                                    sx={{
                                        borderWidth: "3px",
                                        borderStyle: "dashed",
                                        borderColor: solved ? theme.colors.success.main : theme.colors.error.main,
                                        padding: "1px"
                                    }}
                                    imgProps={{
                                        style: {
                                            opacity: solved ? "100%" : "40%",
                                        }
                                    }}
                                />
                            </Tooltip>
                        </Grid>
                    ))
                }

                {solved[0] &&
                    solved[1] &&
                    solved[2] &&
                    solved[3] &&
                    solved[4] &&
                    solved[5] && (
                        <>
                            <Grid item lg={3} key={7}>
                                <LoadingButton
                                    variant="contained"
                                    onClick={requestNFT}
                                    loading={showBackDrop}
                                    loadingIndicator="Requesting..."
                                >
                                    Request NFT
                                </LoadingButton>
                            </Grid>
                        </>
                    )}
            </Grid>
        </>
    );
};

export default HeaderNFTList;
