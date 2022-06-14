import type { Router } from "vue-router";
import { unref } from "vue";
import { useRouter } from "vue-router";

import { emitter } from "@/config/bus";
import { REDIRECT_NAME, HOME_NAME } from "@/router/constant";

function handleError(e: Error) {
  emitter.emit("Global_Error", e);
}
/**
 *页面跳转
 *
 * @export
 * @param {Router} [_router]
 * @returns {(opt: string, isReplace: boolean) => void}
 */
export function useGo(_router?: Router): (opt: string, isReplace: boolean) => void {
  let router: Router;
  if (_router) {
    router = _router;
  } else {
    router = useRouter();
  }
  const { push, replace } = router;
  function go(opt = HOME_NAME, isReplace = false) {
    if (!opt) {
      return;
    }
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
  }
  return go;
}

/**
 *页面刷新
 *
 * @param {Router} [_router]
 * @returns {(() => Promise<boolean>)}
 */
export const useRedo = (_router?: Router): (() => Promise<boolean>) => {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params["_redirect_type"] = "name";
        params["path"] = String(name);
      } else {
        params["_redirect_type"] = "path";
        params["path"] = fullPath;
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};
