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

/* React router setting */
const routes: PartialRouteObject[] = [
    {
        path: "/",
        element: <Home />
    }
];

export default routes;
