import { Dispatch, SetStateAction, createContext } from 'react';

type WaitEffectContextType = {
    showBackDrop: boolean;
    showSnackBar: number;
    successMessage?: string;
    errorMessage?: string;
    setShowBackDrop: Dispatch<SetStateAction<boolean>>;
    setShowSnackBar: Dispatch<SetStateAction<number>>;
    setSuccessMessage: Dispatch<SetStateAction<string>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
};

const WaitEffectContext = createContext<WaitEffectContextType>({} as WaitEffectContextType);

export default WaitEffectContext;
