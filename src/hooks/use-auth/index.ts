import type { Router } from "vue-router";

import { useRouter } from "vue-router";

import { useUserStore } from "@/store/modules/user";

export function useAuth(_router?: Router): Recordable {
  const userStore = useUserStore();

  const router = _router || useRouter();

  function toLogin() {
    if (!userStore.token) router.push("/");
  }
  return {
    toLogin: () => toLogin(),
  };
}
