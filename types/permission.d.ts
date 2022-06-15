//** 权限类型 */
export enum PermissionTypeEnum {
	/** 菜单 */
	MENU = 1,
	/** 页面 */
	PAGE = 2,
	/** 元素 */
	ELE = 3,
	/** 其他 */
	OTHER = -1
}

/** 权限 */
export interface Permission {
	/** 编码 */
	code: string;
	/** 父级编码 */
	pCode: string;
	/** 类型 */
	type: PermissionTypeEnum;
	/** 名称 */
	name: string;
	/** 图标 */
	icon: string;
	/** 是否禁用 */
	disabled: boolean;
	/** 是否可见 */
	visible: boolean;
	/** 排序 */
	sort: number;
	/** 标签 */
	tags: string[];
	/** 路径 */
	path: string;
}

/** 菜单 */
export interface Menu extends Permission {
	/** 子菜单 */
	children?: Menu[];
}
