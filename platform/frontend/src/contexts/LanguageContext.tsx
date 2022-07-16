import { any, string } from 'prop-types';
import { createContext } from 'react';

type LanguageContextType = {
    lang: string;
    setLang: (lang: string) => void;
    multiLang: any;
};

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export default LanguageContext;