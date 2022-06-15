/**默认元数据设置 */
export class MetaSetting implements Setting.IMetaSetting {
	title = "vtd admin";
	logo = "";
	icon = "";
	shortTitle = "vtd";
	description = "vtd admin";
	keywords = "vtd admin";
}

/**
 *  首页地址
 */
export const HOME_URL: string = "/home/index";

/**
 *  元数据设置
 */
const META_SETTING: MetaSetting = new MetaSetting();
META_SETTING.title = "vtd admin";
META_SETTING.shortTitle = "vtd";
META_SETTING.logo = "/assets/logo.png";
META_SETTING.icon = "/assets/favicon.ico";
META_SETTING.description = "vtd admin";
META_SETTING.keywords = "vtd admin vue vue3 ts tsc typescript";

export default META_SETTING;
