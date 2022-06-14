import type { Router, RouteLocationNormalized, RouteRecordNormalized } from "vue-router";
import { emitter } from "@/config/bus";
/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // Notify routing changes
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

const key = Symbol();

export function setRouteChange(lastChangeRoute: RouteLocationNormalized): void {
  const r = getRawRoute(lastChangeRoute);
  emitter.emit(key, r);
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export function listenerRouteChange(callback: (route: RouteLocationNormalized) => void, immediate = true): void {
  emitter.on(key, (event) => immediate && event && callback(event as RouteLocationNormalized));
}
