import { useWeb3React } from "@web3-react/core";

const useEthAddress = () => {
    const { active, account } = useWeb3React();
    if (active) {
        return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
    } else {
        return 'Anonymous';
    }
};


export default useEthAddress;
