import { FC, Suspense, lazy } from 'react';
import { PartialRouteObject } from 'react-router';
import SuspenseComponent from '../components/Suspense';

const SuspenseWrapper: FC = (Component) => {
    return () => (
        <Suspense fallback={<SuspenseComponent />}>
            <Component />
        </Suspense>
    );
};

const Landing = SuspenseWrapper(lazy(() => import('../components/Landing')));
const Home = SuspenseWrapper(lazy(() => import('../components/Main/Home')));
const Tutorial = SuspenseWrapper(lazy(() => import('../components/Main/Tutorial')));
const Problems = SuspenseWrapper(lazy(() => import('../components/Main/Problems'))); 
const Challenge = SuspenseWrapper(lazy(() => import('../components/Main/Challenges'))); 
const Template = SuspenseWrapper(lazy(() => import('../components/Main/Template')));
const Login = SuspenseWrapper(lazy(() => import('../components/Auth/Login')));
const Register = SuspenseWrapper(lazy(() => import('../components/Auth/Register')));
const Error404 = SuspenseWrapper(lazy(() => import('../components/Error/_404')));

/* React router setting */
const router: PartialRouteObject[] = [
    {
        path: '/',
        exact: true,
        element: <Landing />,
    },
    {
        path: '/home',
        exact: true,
        element: <Home />,
    },
    {
        path: '/tutorial',
        exact: true,
        element: <Tutorial />,
    },
    {
        path: '/problems',
        children: [
            {
                path: '',
                element: <Problems />
            },
            {
                path: ':id',
                element: <Challenge />
            }
        ]
    },
    {
        path: '/login',
        exact: true,
        element: <Login />,
    },
    {
        path: '/register',
        exact: true,
        element: <Register />,
    },
    /* Add new path here */
    {
        path: '/template',
        exact: true,
        element: <Template />,
    },
    {
        path: '*',
        element: <Error404 />
    }
];

export default router;
