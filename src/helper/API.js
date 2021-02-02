import queryString from "query-string";
import _ from "lodash";
import config from "./config";

const API = {
  call({ service_name, path, parameters = {}, method = "get" }) {
    const endpoint = config.get(`endpoint.${service_name}`);
    let configParam = {};
    let url = endpoint.host + "/" + path;
    let token = localStorage.getItem("token");

    configParam = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
        accessToken: !_.isEmpty(token) ? token : "GUEST",
        channelId: config.get("config.API_CHANNEL_ID"),
      },
      credentials: "same-origin",
      method,
    };
    if (method === "post" || method === "put" || method === "patch") {
      configParam.body = JSON.stringify(parameters);
    } else if (method === "delete") {
      configParam.body = JSON.stringify(parameters);
    } else {
      url = `${url}?${queryString.stringify(parameters)}`;
    }

    const promise = new Promise((resolve, reject) => {
      fetch(url, configParam)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.code === "NOT_AUTHORIZED") {
            window.location = config.get("config.REDIRECT_URL");
          }
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },

  get({ service_name, path, parameters = {}, method = "get" }) {
    return this.call({ service_name, path, parameters, method });
  },
  post({ service_name, path, parameters = {}, method = "post" }) {
    return this.call({ service_name, path, parameters, method });
  },
  put({ service_name, path, parameters = {}, method = "put" }) {
    return this.call({ service_name, path, parameters, method });
  },
  patch({ service_name, path, parameters = {}, method = "patch" }) {
    return this.call({ service_name, path, parameters, method });
  },
  delete({ service_name, path, parameters = {}, method = "delete" }) {
    return this.call({ service_name, path, parameters, method });
  },
};

export default API;
