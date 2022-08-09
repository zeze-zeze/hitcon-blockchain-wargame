import { Dispatch, SetStateAction, createContext } from 'react';
import Web3 from "web3";
import { Contract } from "web3-eth-contract"

type SolvedChallengesContextType = {
    contracts: Contract[];
    solved: boolean[];
    initContracts: (account: string) => void;
    initSolvedChallenges: (account: string) => void;
};

const SidebarToggledContext = createContext<SolvedChallengesContextType>({} as SolvedChallengesContextType);

export default SidebarToggledContext;
