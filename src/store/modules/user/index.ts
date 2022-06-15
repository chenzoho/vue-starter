import { defineStore, Store } from "pinia";
import { store } from "@/store";
import { Base64 } from "js-base64";
import { UserState } from "./types";

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		token: window.localStorage.getItem("token") || "",
		expire: 0,
		refresh: 0,
		code: "",
		name: "",
		gender: 0,
		avatar: ""
	}),
	getters: {},
	actions: {
		/**
		 * 更新用户信息
		 * @param {Partial<UserState>} partial
		 */
		update(partial: Partial<UserState>): void {
			this.$patch(partial);
		},
		/**
		 * 检查token
		 *
		 * @param {string} token
		 * @return {boolean} 成功/失败
		 */
		check(token: string): boolean {
			try {
				// 解析playload
				const playload = token.split(".")[1];
				if (!playload) throw new Error("token不合法");
				const base64 = Base64.decode(playload);
				const model = JSON.parse(base64);
				// 判断token是否过期
				if (!model || !model.exp) throw new Error("token不合法");
				if (model.exp * 1000 <= new Date().getTime()) throw new Error("token已过期");
				// 存储token和用户信息
				window.localStorage.setItem("token", token);
				this.token = token;
				this.expire = model.exp;
				this.refresh = model.refresh;
				this.name = model.name;
				this.gender = model.gender;
				this.avatar = model.avatar;
				return true;
			} catch (error) {
				window.localStorage.removeItem("token");
				this.token = "";
				return false;
			}
		},
		/**
		 * 检查token
		 * @returns {booolean} 成功/失败
		 */
		valid(): boolean {
			return this.code !== "" && this.expire > new Date().getTime();
		}
	}
});

export function useUserOutsideStore(): Store {
	return useUserStore(store);
}
