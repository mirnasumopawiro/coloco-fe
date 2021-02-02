import { API } from "../helper";

export const getFormOptions = (companyId) => {
  return API.get({
    service_name: "coloco",
    path: `form-options/${companyId}`,
  });
};

export const statusFormSuccess = (data) => {
  return {
    type: "STATUS_FORM_SUCCESS",
    data,
  };
};
