import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-newspaper",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["General Info"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Profile",
    to: "/profile",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Attendance",
    to: "/attendance",
    icon: "cil-fingerprint",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["People"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Employee Directory",
    to: "/employee-directory",
    icon: "cil-sitemap",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Finance"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Reimbursement",
    to: "/reimbursement",
    icon: "cil-cash",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Payroll",
    icon: "cil-calculator",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Payroll Info",
        to: "/payroll-info",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Payslip",
        to: "/payslip",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Support"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ticket",
    to: "/ticket",
    icon: "cil-tags",
  },
];

export default _nav;
