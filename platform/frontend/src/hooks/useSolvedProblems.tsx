import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";

const useSolvedProblems = () => {
    const [solvedProblems, setSolvedProblems] = useState<Array<boolean>>([false, false, false, false, false, false]);
    useEffect(() => {
        if (active) {
            /* Procure all solved problems */
            //const allNewSolvedEvents = await contract.getPastEvents('allSolved', {fromBlock: 0, toBlock: 'latest'});
            setSolvedProblems([true, false, true, false, false, false]);
        } else {
            setSolvedProblems([false, false, false, false, false, false]);
        }
    }, [solvedProblems]);
    const { active, account } = useWeb3React();
    return solvedProblems;
};

export default useSolvedProblems;
