import { ObjectDirective, DirectiveBinding } from "vue";

const repeatDirective: ObjectDirective = {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    el.style.position = "fixed";
    const s = binding.arg || "top";
    el.style[s] = binding.value + "px";
  },
};

export default repeatDirective;

const name = "pin";
export { name };
