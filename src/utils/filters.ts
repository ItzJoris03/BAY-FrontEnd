import { Route } from "@/types/routes";

export const filterRoutes = (routes: Record<string, Route>) => Object.entries(routes).filter(([, route]) => route.linkname && (route?.config?.hiddenFromMenu === undefined || route?.config.hiddenFromMenu === false));
