// import necessary library
import { useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

// import local components
import { injected } from "./InjectedConnector";
import { setupNetwork } from "./walletNetwork";

const useAuth = () => {
  const { active, connector, activate, deactivate } = useWeb3React();

  if (active && connector == injected) {
    localStorage.setItem("_hitcon_wargame_", "Injected");
  }

  const logout = useCallback(() => {
    deactivate();
    localStorage.removeItem("_hitcon_wargame_");
  }, [deactivate]);

  const login = useCallback(() => {
    activate(injected, async (error: Error) => {
      if (error instanceof UnsupportedChainIdError) {
        const hasSetup = await setupNetwork();

        if (hasSetup) {
          activate(injected);
        } else {
          logout();
        }
      } else {
        if (error instanceof NoEthereumProviderError) {
          console.log("Provider Error", "No provider was found");
        } else if (error instanceof UserRejectedRequestErrorInjected) {
          console.log(
            "Authorization Error",
            "Please authorize to access your account"
          );
        } else {
          console.log(error.name, error.message);
        }
        logout();
      }
    }).catch(() => {
      logout();
    });
  }, [activate, logout]);

  return { login, logout };
};

export default useAuth;
