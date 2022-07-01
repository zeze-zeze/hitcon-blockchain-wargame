import { useEffect } from "react";
import useAuth from "./useAuth";

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connecetedWallet = localStorage.getItem("_hitcon_wargame_");

    if (connecetedWallet === "Injected") {
      login();
    }
  }, [login]); // intentionally only running on mount (make sure it's only mounted once :))
};

export default useEagerConnect;
