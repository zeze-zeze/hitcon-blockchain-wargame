import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import info from "challenges/info.json";
import { AbiItem } from "web3-utils";

const web3 = new Web3(Web3.givenProvider);

const useSolvedProblems = () => {
    const { account, active } = useWeb3React();
    const [solved, setSolved] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

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

    useEffect(() => {
        if (active && account) {
            chal1Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => {
                    if (t) {
                        setSolvedProblems(1);
                    }
                });
            chal2Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => {
                    if (t) {
                        setSolvedProblems(2);
                    }
                });
            chal3Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => {
                    if (t) {
                        setSolvedProblems(3);
                    }
                });
            chal4Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => {
                    if (t) {
                        setSolvedProblems(4);
                    }
                });
            chal5Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => {
                    if (t) {
                        setSolvedProblems(5);
                    }
                });
            chal6Contract.methods
                .addressToSolved(account)
                .call({ from: account })
                .then((t: boolean) => {
                    if (t) {
                        setSolvedProblems(6);
                    }
                });
        }
    }, [account]);

    useEffect(() => {
        chal1Contract.events
            .hadSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(1);
            });

        chal2Contract.events
            .hadSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(2);
            });

        chal3Contract.events
            .hadSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(3);
            });
        chal4Contract.events
            .hadSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(4);
            });
        chal5Contract.events
            .hadSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(5);
            });
        chal6Contract.events
            .hadSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(6);
            });

        chal1Contract.events
            .newSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(1);
            });

        chal2Contract.events
            .newSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(2);
            });

        chal3Contract.events
            .newSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(3);
            });
        chal4Contract.events
            .newSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(4);
            });
        chal5Contract.events
            .newSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(5);
            });
        chal6Contract.events
            .newSolved({ filter: { _solver: account } })
            .on("data", (log: any) => {
                setSolvedProblems(6);
            });
    }, []);

    const setSolvedProblems = useCallback((idx: number) => {
        const solvedDup = [...solved];
        solvedDup[idx - 1] = true;
        setSolved(solvedDup);
    }, []);

    return solved;
};

export default useSolvedProblems;
