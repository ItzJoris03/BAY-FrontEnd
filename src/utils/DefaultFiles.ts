import { RoutesConfig } from '@/types/routes';

const _routesData = await import('@/assets/json/routes.json');
export const ROUTES_CONF = _routesData.default as RoutesConfig;