import { Language, Route as RouteType } from "@/types/routes";
import { ROUTES_CONF } from "./DefaultFiles";

export function getRoutePath(
    originalPath: string,
    lang: Language,
): string {
    const segments = originalPath.split("/").filter(Boolean);
    // const translated = findRoutePathSegments(segments, ROUTES_CONF.routes, lang, oldLang);
    const prev: string[] = [];

    const translated: string[] = [];
    for (const segment of segments) {
        const route = findRoute(prev.join('/') + '/' + segment);

        if (!route || route.config?.usePathAsRoute) {
            translated.push(segment.toLowerCase());
        } else {
            const translatedSegment = route.linkname?.[lang as keyof typeof route.linkname] || segment;
            translated.push(translatedSegment.toLowerCase());
        }
        prev.push(segment);
    }

    return "/" + (translated ?? segments).join("/");
}


export const getCurrentRoute = (preferredPath?: string): RouteType => {
    const path = preferredPath || window.location.pathname;

    // Start the search from the top-level routes
    let matchedRoute = findRoute(path);

    // If no route is found, fallback to the wildcard route (error page or 404)
    if (!matchedRoute) {
        matchedRoute = ROUTES_CONF.routes['/*'];
    }

    return matchedRoute;
};

export function findRoute(currentPath: string): RouteType | null {
    const normalizedPath = currentPath.replace(/\/+$/, "") || "/";
    const segments = normalizedPath.split("/").filter(Boolean); // e.g. "/wiki/recipes" → ["wiki", "recipes"]

    let currentRoutes = ROUTES_CONF.routes;
    let matchedRoute: RouteType | null = null;

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i].toLowerCase();
        let found = false;

        for (const routeKey in currentRoutes) {
            const cleanKey = routeKey.replace(/^\//, "").toLowerCase();
            const route = currentRoutes[routeKey];

            const matchesRaw = cleanKey === segment;
            const matchesAnyLang = Object.entries(route.linkname || {}).some(([, name]) =>
                (name as string).toLowerCase() === segment
            );

            if (matchesRaw || matchesAnyLang) {
                matchedRoute = route;
                found = true;

                // If there are children, go deeper
                if (route.children && i + 1 < segments.length) {
                    currentRoutes = route.children;
                } else {
                    currentRoutes = {}; // No deeper levels
                }

                break;
            }
        }

        if (!found) {
            matchedRoute = currentRoutes["/*"] || null;
            break;
        }
    }

    return matchedRoute;
}
