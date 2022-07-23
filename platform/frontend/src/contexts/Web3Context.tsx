import { Dispatch, SetStateAction, createContext } from 'react';
import { Contract } from "web3-eth-contract"

type SolvedProblemsContextType = {
    contracts: Contract[];
    solved: boolean[];
    initContracts: (account: string) => void;
};

const SidebarToggledContext = createContext<SolvedProblemsContextType>({} as SolvedProblemsContextType);

export default SidebarToggledContext;