import _get from "lodash/get";
import configs from "../config/index";

const config = {
  get(name) {
    return _get(configs, name.trim());
  },
};

export default config;
