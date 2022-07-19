import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";

const useEthAddress = () => {
    const { active, account } = useWeb3React();
    const [address, setAddress] = useState<string>('');
    useEffect(() => {
        if (active && typeof account === 'string') {
            setAddress(`${account.substring(0, 6)}...${account.substring(account.length - 4)}`);
        } else {
            setAddress('Anonymous');
        }
    }, [account]);
    return address;
};


export default useEthAddress;
