/**tagview */
export interface multipleTabState {
	/** 访问视图 */
	visitedViews: RouteLocationNormalized[];
	/** 缓存视图 */
	cachedViews: Set<string>;
	/** 拖拽index */
	lastDragEndIndex: number;
}
