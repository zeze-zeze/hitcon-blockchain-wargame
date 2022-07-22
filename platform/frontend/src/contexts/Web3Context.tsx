import { Dispatch, SetStateAction, createContext } from 'react';
import Web3 from "web3";
import { Contract } from "web3-eth-contract"

type SolvedProblemsContextType = {
    contracts: Contract[];
    solved: boolean[];
    initContracts: (account: string) => void;
};

const SidebarToggledContext = createContext<SolvedProblemsContextType>({} as SolvedProblemsContextType);

export default SidebarToggledContext;