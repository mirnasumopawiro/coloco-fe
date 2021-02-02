import React from "react";
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import("./pages/dashboard/Dashboard"),
  loading: Loading,
});

const Attendance = Loadable({
  loader: () => import("./pages/attendance/Attendance"),
  loading: Loading,
});

const PayrollInfo = Loadable({
  loader: () => import("./pages/payrollInfo/PayrollInfo"),
  loading: Loading,
});

const Payslip = Loadable({
  loader: () => import("./pages/payslip/Payslip"),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import("./pages/profile/Profile"),
  loading: Loading,
});

const EmployeeDirectory = Loadable({
  loader: () => import("./pages/employeeDirectory/EmployeeDirectory"),
  loading: Loading,
});

const Password = Loadable({
  loader: () => import("./pages/password/Password"),
  loading: Loading,
});

const Reimbursement = Loadable({
  loader: () => import("./pages/reimbursement/ReimbursementList"),
  loading: Loading,
});

const Ticket = Loadable({
  loader: () => import("./pages/ticket/TicketList"),
  loading: Loading,
});

const routes = [
  { path: `/dashboard`, name: "Dashboard", component: Dashboard },
  { path: `/attendance`, name: "Attendance", component: Attendance },
  { path: `/payroll-info`, name: "Payroll Info", component: PayrollInfo },
  { path: `/payslip`, name: "Payslip", component: Payslip },
  { path: `/profile`, name: "Profile", component: Profile },
  {
    path: `/employee-directory`,
    name: "Employee Directory",
    component: EmployeeDirectory,
  },
  { path: `/change-password`, name: "Change Password", component: Password },
  { path: `/reimbursement`, name: "Reimbursement", component: Reimbursement },
  { path: `/ticket`, name: "Ticket", component: Ticket },
];

export default routes;
