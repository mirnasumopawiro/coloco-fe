import { API } from "../helper";

export const login = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "login",
    parameters,
  });
};

export const logout = () => {
  return API.post({
    service_name: "coloco",
    path: "logout",
  });
};

export const changePassword = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "change-password",
    parameters,
  });
};

export const getAnnouncement = (company_id) => {
  return API.get({
    service_name: "coloco",
    path: `announcements/${company_id}`,
  });
};

export const getEmployeeDirectory = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "employee-directory",
    parameters,
  });
};

export const getProfile = (employee_id) => {
  return API.get({
    service_name: "coloco",
    path: `profile/${employee_id}`,
  });
};

export const getAttendance = (parameters, employee_id) => {
  return API.post({
    service_name: "coloco",
    path: `attendance/${employee_id}`,
    parameters,
  });
};

export const getPayslip = (parameters, employee_id) => {
  return API.post({
    service_name: "coloco",
    path: `payslip/${employee_id}`,
    parameters,
  });
};

export const requestEditProfile = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "request-edit-profile",
    parameters,
  });
};

export const getPayrollInfo = (employee_id) => {
  return API.get({
    service_name: "coloco",
    path: `payroll-info/${employee_id}`,
  });
};

export const requestReimbursement = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "reimbursement/create",
    parameters,
  });
};

export const getReimbursementList = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "reimbursement",
    parameters,
  });
};

export const getReimbursementDetails = (id) => {
  return API.get({
    service_name: "coloco",
    path: `reimbursement/${id}`,
  });
};

export const requestTicket = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "ticket/create",
    parameters,
  });
};

export const getTicketList = (parameters) => {
  return API.post({
    service_name: "coloco",
    path: "ticket",
    parameters,
  });
};

export const getTicketDetails = (id) => {
  return API.get({
    service_name: "coloco",
    path: `ticket/${id}`,
  });
};

export const statusEmployeeSuccess = (data) => {
  return {
    type: "STATUS_EMPLOYEE_SUCCESS",
    data,
  };
};
