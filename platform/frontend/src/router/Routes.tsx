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

const Home = SuspenseWrapper(lazy(() => import('../components/MainComponent/Home')));
const Tutorial = SuspenseWrapper(lazy(() => import('../components/MainComponent/Tutorial')));
const Problems = SuspenseWrapper(lazy(() => import('../components/MainComponent/Problems'))); 
const Template = SuspenseWrapper(lazy(() => import('../components/MainComponent/Template')));

/* React router setting */
const routes: PartialRouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/tutorial',
        element: <Tutorial />,
    },
    {
        path: '/problems',
        element: <Problems />,
    },
    /* Add new path here */
    {
        path: '/template',
        element: <Template />,
    },
];

export default routes;
