import { FC, Suspense, lazy } from 'react';
import { PartialRouteObject } from 'react-router';
import PropTypes from 'prop-types';
import SuspenseComponent from '../components/Suspense';

const SuspenseWrapper: FC = (Component) => {
    return () => (
        <Suspense fallback={<SuspenseComponent />}>
            <Component />
        </Suspense>
    );
};

const Home = SuspenseWrapper(lazy(() => import('../components/Home')));
const Tutorial = SuspenseWrapper(lazy(() => import('../components/Tutorial')));
const Problems = SuspenseWrapper(lazy(() => import('../components/Problems')));

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
];

export default routes;
