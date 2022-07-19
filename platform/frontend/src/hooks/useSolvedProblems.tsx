import { useState, useCallback } from 'react';
import { useWeb3React } from "@web3-react/core";

const useSolvedProblems = () => {
    const [solved, setSolved] = useState<Array<boolean>>([false, true, true, false, false, false]);
    const { active } = useWeb3React();
    const getSolvedProblems = useCallback(() => {
        /* Procure all solved problems */
        //const allNewSolvedEvents = await contract.getPastEvents('allSolved', {fromBlock: 0, toBlock: 'latest'});
        return solved;
    }, [solved]);

    const setSolvedProblems = (idx: number) => {
        const solvedDup = [...solved];
        solvedDup[idx - 1] = true;
        setSolved(solvedDup);
    }
    
    return { getSolvedProblems, setSolvedProblems };
};

export default useSolvedProblems;
