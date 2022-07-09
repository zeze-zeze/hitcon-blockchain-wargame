import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";

const useSolvedProblems = () => {
    const [solvedProblems, setSolvedProblems] = useState<Array<boolean>>([false, false, false, false, false, false]);
    const { active } = useWeb3React();
    useEffect(() => {
        if (active) {
            /* Procure all solved problems */
            //const allNewSolvedEvents = await contract.getPastEvents('allSolved', {fromBlock: 0, toBlock: 'latest'});
            setSolvedProblems([false, true, true, false, false, false]);
        } else {
            setSolvedProblems([false, false, false, false, false, false]);
        }
    }, [active]);
    return { solvedProblems, setSolvedProblems };
};

export default useSolvedProblems;
