import { FC, Suspense, lazy } from 'react';
import { PartialRouteObject } from 'react-router';
import PropTypes from 'prop-types';

import Dashboard from '../components/Dashboard';
import SuspenseComponent from '../components/Suspense';

const SuspenseLoader: FC = ({ content }) => {
    return (
        <Suspense fallback={<SuspenseComponent />}>
            {content}
        </Suspense>
    );
};

SuspenseLoader.propTypes = {
    content: PropTypes.node,
}

/* React router setting */
const routes: PartialRouteObject[] = [
    {
        path: "/",
        element: <Dashboard />
    }
];

export default routes;
