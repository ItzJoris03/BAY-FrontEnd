
// import { Lang, languages, ROUTES_CONF } from "@/types/content.d";
// import { IRoute, IRouteConfig } from "@/types/routes";

import { Language, LinkNames, Route as RouteType } from "@/types/routes";
import { ROUTES_CONF } from "./DefaultFiles";


// export const flattenRoutes = (routesObj: {
//     [path: string]: IRoute;
// }) => {
//     const flattenedRoutes: Array<{
//         path: string,
//         linkname: string,
//     }> = [];
//     for (const [path, { linkname, children, config }] of Object.entries(routesObj)) {
//         const nameByLang = linkname && getLinkName(linkname);

//         if (nameByLang) {
//             flattenedRoutes.push({
//                 path: getRoute(path, linkname, config),
//                 linkname: nameByLang
//             });

//             if (children) {
//                 const childrenRoutes = flattenRoutes(children);
//                 flattenedRoutes.push(...childrenRoutes);
//             }
//         }
//     }
//     return flattenedRoutes;
// };

// export const getLanguageFromURL = (): Lang => {
//     const parts = window.location.pathname.split('/').filter(Boolean);

//     if (parts.length > 0 && languages.includes(parts[0])) {
//         return parts[0] as Lang;
//     }
//     return ROUTES_CONF.config?.default_language || "nl" as Lang;
// }

// export const getLinkName = (linkname: string | { [lang in Lang]?: string }) => {
//     return typeof linkname === 'string'
//         ? linkname : linkname[getLanguageFromURL() as keyof typeof linkname];
// }

// export const getRoute = (path: string, linkname?: string | undefined | { [lang in Lang]?: string }, routeConfig?: IRouteConfig | undefined, lang = getLanguageFromURL()) => {
//     if (!(routeConfig || linkname) && path in ROUTES_CONF.routes) {
//         const ROUTE = ROUTES_CONF.routes[path as keyof typeof ROUTES_CONF.routes] as IRoute;
//         routeConfig = ROUTE.config;
//         linkname = ROUTE.linkname;
//     }

//     if (!routeConfig?.disableMultiLanguageSupport) {
//         if (ROUTES_CONF.config?.default_language !== lang) {
//             if (routeConfig?.usePathAsRoute || typeof linkname === 'string' || linkname === undefined || !(lang in linkname)) {
//                 return `/${lang}/${path.slice(1).toLowerCase()}`;
//             } else return `/${lang}/${linkname[lang as keyof typeof linkname]?.toLowerCase()}`;
//         } else {
//             if (routeConfig?.usePathAsRoute || typeof linkname === 'string' || linkname === undefined || !(lang in linkname)) {
//                 return path.toLowerCase();
//             } else return `/${linkname[lang as keyof typeof linkname]?.toLowerCase()}`;
//         }
//     } else {
//         if (routeConfig?.usePathAsRoute || typeof linkname !== 'string') {
//             return path.toLowerCase();
//         } else return `/${linkname.toLowerCase()}`;
//     }
// }

export const getRoutePath = (path: string, route: RouteType, language: Language): string => {
    if (route.config?.usePathAsRoute) {
        return path;
    }

    const linkname = route.linkname?.[language as keyof LinkNames];
    return linkname ? `/${(linkname as string).toLowerCase()}` : path;
};

export const getCurrentPath = (language: Language): RouteType | null => {
    const path = window.location.pathname;

    // Helper function to recursively find the route config
    const findRouteConfig = (currentPath: string, routes: Record<string, RouteType>): RouteType | null => {
        for (const routePath in routes) {
            const route = routes[routePath];

            // Match exact route path (if the `usePathAsRoute` flag is true)
            if (route.config?.usePathAsRoute && currentPath === routePath) {
                return route;
            }

            // Check if the linkname matches the current path for the given language
            const linkname = route.linkname?.[language as keyof LinkNames];
            if (linkname && currentPath === `/${(linkname as string).toLowerCase()}`) {
                return route;
            }

            // Handle route children (nested routes)
            if (route.children) {
                const childRoute = findRouteConfig(currentPath, route.children);
                if (childRoute) {
                    return childRoute;
                }
            }
        }
        return null; // Return null if no matching route is found
    };

    // Start the search from the top-level routes
    let matchedRoute = findRouteConfig(path, ROUTES_CONF.routes);

    // If no route is found, fallback to the wildcard route (error page or 404)
    if (!matchedRoute) {
        matchedRoute = ROUTES_CONF.routes['/*'] || null;
    }

    return matchedRoute;
};