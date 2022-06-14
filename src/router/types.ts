import type { RouteMeta } from "vue-router";
import { defineComponent } from "vue";

export type Component<T = unknown> = ReturnType<typeof defineComponent> | (() => Promise<typeof import("*.vue")>) | (() => Promise<T>);

export interface MenuTag {
  type?: "primary" | "error" | "warn" | "success";
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;

  icon?: string;

  path: string;

  // path contains param, auto assignment.
  paramPath?: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}
