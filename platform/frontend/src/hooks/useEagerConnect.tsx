import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from "components/Connect/InjectedConnector";

const useEagerConnect = () => {
    const { activate, active } = useWeb3React();
    const [tried, setTried] = useState<boolean>(false);

    useEffect(() => {
        const connecetedWallet = localStorage.getItem("_hitcon_wargame_");
        if (connecetedWallet === "Injected") {
            injected.isAuthorized().then((authorized: boolean) => {
                if (authorized) {
                    activate(injected, undefined, true).catch(() => {
                        setTried(true);
                    });
                } else {
                    setTried(true);
                }
            });
        }
    }, []); // intentionally only running on mount (make sure it's only mounted once :))

    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active]);

    return tried;
};

export default useEagerConnect;
