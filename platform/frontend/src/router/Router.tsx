import { FC, ReactNode, Suspense, lazy } from 'react';
import SuspenseComponent from 'components/Suspense';
import { Web3ReactProvider } from "@web3-react/core";
//import Web3 from "web3/dist/web3.min.js";
import Web3 from 'web3';

type ProviderWrapperProps = {
    children?: ReactNode,
};

const getLibrary = (provider: any) => {
    return new Web3(provider);
};

const Web3ReactProviderWrapper: FC<ProviderWrapperProps> = (props) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
        { props.children }
        </Web3ReactProvider>
    )
};

const SuspenseWrapper = (Component: FC) => {
    return () => (
        <Web3ReactProviderWrapper>
            <Suspense fallback={<SuspenseComponent />}>
                <Component />
            </Suspense>
        </Web3ReactProviderWrapper>
    );
};

const Home: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Main/Home')));
const Landing: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Landing')));
const Connect: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Connect')));
const Tutorial: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Main/Tutorial')));
const Problems: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Main/Problems'))); 
const Faucet: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Main/Faucet'))); 
const Challenge: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Main/Challenges'))); 
const Template: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Main/Template')));
const Error404: () => JSX.Element = SuspenseWrapper(lazy(() => import('components/Error/_404')));

/* React router setting */
const router = [
    {
        path: '',
        exact: true,
        element: <Landing />,
    },
    {
        path: 'home',
        exact: true,
        element: <Home />  
    },
    {
        path: 'tutorial',
        exact: true,
        element: <Tutorial />,
    },
    {
        path: 'connect',
        exact: true,
        element: <Connect />,
    },
    {
        path: 'problems',
        children: [
            {
                path: '',
                element: <Problems />
            },
            {
                path: ':id',
                element: <Challenge />
            },
        ]
    },
    {
        path: 'faucet',
        exact: true,
        element: <Faucet />,
    },
    /* Add new path here */
    {
        path: 'template',
        exact: true,
        element: <Template />,
    },
    {
        path: '*',
        element: <Error404 />
    }
];

export default router;
