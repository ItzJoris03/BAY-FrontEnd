import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { generateRoutes } from '@/utils/generateRoutes';
import { useMemo } from 'react';

const AppRoutes = () => {
    const routes = useMemo(() => generateRoutes(), []); // memoize once
    const routing = useRoutes(routes);
    return routing;
};

const AppRouter = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default AppRouter;