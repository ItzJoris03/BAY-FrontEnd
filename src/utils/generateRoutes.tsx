import React from "react";
import { RouteObject } from "react-router-dom";
import { ROUTES_CONF } from "./DefaultFiles";
import { Route } from "@/types/routes";
import { getLanguagePreference } from "./LanguageHandler";
import { getRoutePath } from "./routing_helper_functions";

const baseFolder = ROUTES_CONF._BASE_FOLDER;
// const defaultLangExt = ROUTES_CONF.config.extensions.default;
// const languageDomains = ROUTES_CONF.config.extensions.registered;
const linknames = ROUTES_CONF.routes;

// function getLangFromDomain(): string {
//     const domain = window.location.hostname.split(".").pop();
//     return languageDomains.includes(domain!) ? domain! : defaultLangExt;
// }

// Dynamically import the view
const loadView = (filename: string) =>
    React.lazy(() =>
        import(`../${baseFolder}/${filename}.tsx`).catch(() =>
            import(`../${baseFolder}/Error.tsx`)
        )
    );


const buildRoute = (path: string, routeObj: Route, lang: string): RouteObject => {
    const useRawPath = routeObj.config?.disableMultiLanguageSupport || routeObj.config?.usePathAsRoute;

    // Determine the route path (if not using translation, use raw path)
    const routePath = useRawPath
        ? path
        : getRoutePath(path, lang)

    // console.log(`Resolved route: ${path} -> ${routePath}: ${routeObj.filename}.tsx`);

    // Return the current route without embedding children
    return {
        path: routePath, // this will be used for matching the route
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                {React.createElement(loadView(routeObj.filename))}
            </React.Suspense>
        ),
    };
};


export function generateRoutes(): RouteObject[] {
    const lang = getLanguagePreference();
    const routes: RouteObject[] = [];

    function flattenRoutes(
        path: string,
        routeObj: Route
    ) {
        // Push the route at this level
        routes.push(buildRoute(path, routeObj, lang));

        // Only recurse if routeObj is an object with children
        if (typeof routeObj === "object" && routeObj.children) {
            for (const childPath in routeObj.children) {
                const childObj = routeObj.children[childPath];
                const fullChildPath = `${path}/${childPath.replace(/^\//, '')}`;
                flattenRoutes(fullChildPath, childObj);
            }
        }
    }

    for (const path in linknames) {
        if (path === "_COMMENT" || path === "_BASE_FOLDER") continue;
        flattenRoutes(path, linknames[path]);
    }

    return routes;
}
