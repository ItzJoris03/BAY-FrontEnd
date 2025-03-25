import React, { ReactNode, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import type { Language, Route as RouteType } from '@/types/routes';
import { ROUTES_CONF } from '@/utils/DefaultFiles';
import { AnimatePresence } from 'framer-motion';
import { getCurrentPath, getRoutePath } from '@/utils/routing_helper_functions';
import Navbar from './Navbar/Navbar';
import { getLanguagePreference } from '@/utils/LanguageHandler';


// Function to dynamically load components based on the filename
const loadComponent = (filename: string) => {
    return lazy(() => import(`../views/${filename}.tsx`).catch(() => {
        console.error(`Failed to load component: ${filename}`);
        return { default: () => <div>Component not found</div> };
    }));
};
// Recursive function to generate routes from JSON config
const generateRoutes = (
    routes: Record<string, RouteType>,
    language: Language,
    basePath = ""
): ReactNode[] => {
    return Object.keys(routes).map((path) => {
        const route = routes[path];
        const fullPath = `${basePath}${getRoutePath(path, route, language)}`;
        const Component = loadComponent(route.filename);

        if (route.children) {
            return (
                <Route path={fullPath} key={fullPath} element={<Component />}>
                    {generateRoutes(route.children, language, fullPath)}
                </Route>
            );
        }

        return (
            <Route
                path={fullPath}
                key={fullPath}
                element={<Component />}
            />
        );
    });
};

// Router component
const AppRouter: React.FC = () => (
    <Router>
        {!getCurrentPath(getLanguagePreference())?.config?.hideNavbar && <Navbar />}
        <Suspense fallback={<div>Loading...</div>}>
            <AnimatePresence initial={false} mode="wait">
                <Routes>
                    {generateRoutes(ROUTES_CONF.routes, getLanguagePreference())}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    </Router>
);

export default AppRouter;