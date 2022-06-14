import { Menu } from "#/permission";
import { PropType } from "vue";

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
};
