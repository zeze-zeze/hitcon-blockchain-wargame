import { FC, ReactNode, Suspense, lazy } from 'react';
import { PartialRouteObject } from 'react-router';
import { useWeb3React } from "@web3-react/core";
import SuspenseComponent from 'components/Suspense';
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3/dist/web3.min.js";

type WrapperProps = {
    children?: ReactNode;
};

const getLibrary = (provider: any) => {
    return new Web3(provider);
};

const Web3ReactProviderWrapper: FC = (props: ReactNode) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
        { props.children }
        </Web3ReactProvider>
    )
};

const SuspenseWrapper: FC = (Component) => {
    return () => (
        <Web3ReactProviderWrapper>
            <Suspense fallback={<SuspenseComponent />}>
                <Component />
            </Suspense>
        </Web3ReactProviderWrapper>
    );
};

const Home = SuspenseWrapper(lazy(() => import('components/Main/Home')));
const Login = SuspenseWrapper(lazy(() => import('components/Login')));
const Tutorial = SuspenseWrapper(lazy(() => import('components/Main/Tutorial')));
const Problems = SuspenseWrapper(lazy(() => import('components/Main/Problems'))); 
const Faucet = SuspenseWrapper(lazy(() => import('components/Main/Faucet'))); 
const Challenge = SuspenseWrapper(lazy(() => import('components/Main/Challenges'))); 
const Template = SuspenseWrapper(lazy(() => import('components/Main/Template')));
const Error404 = SuspenseWrapper(lazy(() => import('components/Error/_404')));

/* React router setting */
const router: PartialRouteObject[] = [
    {
        path: '',
        exact: true,
        element: <Home />,
    },
    {
        path: 'tutorial',
        exact: true,
        element: <Tutorial />,
    },
    {
        path: 'login',
        exact: true,
        element: <Login />,
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
