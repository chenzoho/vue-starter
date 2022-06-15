/**默认头部设置 */
export class HeaderSetting implements Setting.IHeaderSetting {
	show = true;
	showFullScreen = true;
	useLock = true;
	showDoc = true;
	showNotice = true;
	showSearch = true;
	fixed = true;
}

/**默认菜单设置 */
export class MenuSetting implements Setting.IMenuSetting {
	collapse = false;
	accordion = true;
	showLogo = true;
	width = 200;
	fixed = true;
}

/**默认标签页设置 */
export class TabsSetting implements Setting.ITabsSetting {
	keeplive = true;
	drag = true;
	showFullScreen = true;
}

/**默认动画设置 */
export class TransitionSetting implements Setting.ITransitionSetting {
	enable = true;
	transition = "";
	loading = true;
	progress = true;
}

/**默认元数据设置 */
export class MetaSetting implements Setting.IMetaSetting {
	title = "vben admin";
	logo = "";
	icon = "";
	shortTitle = "vben";
	description = "";
	keywords = "";
}

/**默认元数据设置 */
export class ContentSetting implements Setting.IContentSetting {
	fixed = false;
}

/**默认布局设置 */
export class FullConfig implements Setting.IFullConfig {
	headerSetting = new HeaderSetting();
	menuSetting = new MenuSetting();
	multiTabsSetting = new TabsSetting();
	transitionSetting = new TransitionSetting();
	metaSetting = new MetaSetting();
	contentSetting = new ContentSetting();
	theme = "light";
	bgColor = "#3333";
}
