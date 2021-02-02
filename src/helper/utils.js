const utils = {
  getEmployeeProfile: () => {
    let employee_profile = localStorage.getItem("employee_profile");
    employee_profile = JSON.parse(employee_profile);
    return employee_profile;
  },
  getCompanyDetails: () => {
    let company_details = localStorage.getItem("company_details");
    company_details = JSON.parse(company_details);
    return company_details;
  },
};
export default utils;
