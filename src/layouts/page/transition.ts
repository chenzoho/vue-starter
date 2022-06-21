import type { FunctionalComponent } from "vue";
import type { RouteLocation } from "vue-router";

export interface DefaultContext {
	Component: FunctionalComponent;
	route: RouteLocation;
}

export function getTransitionName({
	route,
	cacheTabs,
	enable,
	name
}: Pick<DefaultContext, "route"> & {
	enable: boolean;
	name: string;
	cacheTabs: string[];
}): string | undefined {
	if (!enable) {
		return undefined;
	}

	const isInCache = cacheTabs.includes(route.name as string);
	const transitionName = "fade-slide";
	let def: string | undefined = transitionName;

	def = isInCache && route.meta.loaded ? transitionName : undefined;
	return def || (route.meta.transitionName as string) || name;
}
