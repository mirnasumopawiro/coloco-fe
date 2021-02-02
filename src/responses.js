const login = {
  message: "success",
  status: 200,
  data: {
    employee_profile: {
      id: "BNS12345",
      first_name: "Mirna",
      last_name: "Sumopawiro",
      email: "mirna.sumopawiro@binus.ac.id",
      profile_picture_url: "https://bit.ly/3ajtpBc",
    },
    company_details: {
      id: 1,
      name: "BINUS University",
      logo_url: "https://bit.ly/38aAVwF",
    },
  },
};

const logout = {
  message: "success",
  status: 200,
};

const announcements = {
  message: "success",
  status: 200,
  announcement_list: [
    {
      id: 2,
      subject: "Regional Elections Day - National Holiday on 9 December 2020",
      content:
        "<p>Dear everyone,</p><p>Based on Presidential Decree No. 22/2020, the Indonesian government has declared that <strong>9 December 2020 is a national holiday</strong> in Indonesia to allow citizens to cast their votes during the Regional Elections Day.&nbsp;</p><p>Therefore in adherence with the policy, BINUS University also declares 9 December 2020 as a public holiday and encourages all the employees to vote while still following CHSE (Cleanliness, Health, Safety, and Environment) protocols.</p><p>Let&rsquo;s celebrate democracy in Indonesia, cast your vote wisely, and always stay safe!</p><p>Regards,</p><p><strong>People Operations</strong> </p>",
      date_created: "2020-12-08 18:27:57",
      creator: {
        first_name: "Hamish",
        last_name: "Daud",
        job_name: "Recruiter",
        profile_picture_url: "https://bit.ly/37qsxsx",
      },
    },
    {
      id: 1,
      subject: "WFH Regulations",
      content:
        "<p>Dear everyone,</p><p>Due to some new confirmed COVID-19 cases happen in Jakarta area and the situation can be seen more complicated, the company has decided that all employees must be <strong>Working From Home (WFH)</strong>.&nbsp;</p><p>If the employees believes that the job cannot be done from home, please discuss with the Leads and get approval from the Leads for coming to the office. The Leads please kindly consider and will be responsible for the approval and &nbsp;arrangement.</p><p>All of sport club activities &amp; gathering in the office are temporarily held until further notice.</p><p>Lunch are only arranged if there are more than 25 people in the office.</p><p>Please contact <strong>hr@binus.ac.id</strong> for further information.</p><p>Thanks and take care.</p><p>Regards,</p><p><strong>People Operations</strong></p>",
      date_created: "2020-04-11 12:26:27",
      creator: {
        first_name: "Hamish",
        last_name: "Daud",
        job_name: "Recruiter",
        profile_picture_url: "https://bit.ly/37qsxsx",
      },
    },
  ],
};

const my_profile = {
  message: "success",
  status: 200,
  data: {
    profile_details: {
      id: "BNS12345",
      first_name: "Mirna",
      last_name: "Sumopawiro",
      phone_number: "08123456789",
      email: "mirna.sumopawiro@binus.ac.id",
      date_of_birth: "1998-01-01",
      place_of_birth: "Jakarta",
      gender: "Female",
      marital_status: "Single",
      religion: "Catholic",
      type_citizen_id: "KTP",
      citizen_id: "3201022606980003",
      expired_date_citizen_id: null,
      identity_address: "Senayan Residence Building A",
      current_address: "Senayan Residence Building A",
      profile_picture_url: "https://bit.ly/3ajtpBc",
    },
    employment_details: {
      job_name: "Software Engineer",
      department_name: "Technology",
      employment_type: "Full Time",
      join_date: "2020-01-01",
      end_date: "",
    },
  },
};

const reimbursement_list = {
  message: "success",
  status: 200,
  reimbursement_list: [
    {
      transaction_id: 3,
      transaction_date: "2020-12-11",
      type: 1,
      status: 5,
      notes: "Medicine for hyperthyroid",
      proof_file_url: "https://bit.ly/3agvdL0",
      date_created: "2020-12-14",
      resolver_info: null,
    },
    {
      transaction_id: 2,
      transaction_date: "2020-06-13",
      type: 3,
      status: 9,
      notes: "Flight to Korea for training (15 June 2020 & 24 June 2020)",
      proof_file_url: "https://bit.ly/3agvdL0",
      date_created: "2020-06-13",
      resolver_info: {
        resolver_id: "BNS12343",
        resolver_name: "Ashanty",
      },
    },
    {
      transaction_id: 1,
      transaction_date: "2020-03-04",
      type: 1,
      status: 9,
      notes: "5 new monitors for IT Team",
      proof_file_url: "https://bit.ly/3agvdL0",
      date_created: "2020-03-04",
      resolver_info: {
        resolver_id: "BNS12343",
        resolver_name: "Ashanty",
      },
    },
  ],
};

const reimbursement_details = {
  message: "success",
  status: 200,
  data: {
    transaction_id: 2,
    transaction_date: "2020-06-13",
    type: 3,
    status: 9,
    notes: "Flight to Korea for training (15 June 2020 & 24 June 2020)",
    proof_file_url: "https://bit.ly/3agvdL0",
    date_created: "2020-06-13",
    resolver_info: {
      resolver_id: "BNS12343",
      resolver_name: "Ashanty",
    },
  },
};

const ticket_list = {
  message: "success",
  status: 200,
  ticket_list: [
    {
      id: 3,
      date_created: "2020-12-14",
      department_id: 2,
      type: 1,
      status: 9,
      urgency: 0,
      title: "VPN access request",
      notes: "VPN access request for nicholas.saputra@binus.ac.id",
      resolver_info: {
        resolver_id: "BNS12345",
        resolver_name: "Mirna Sumopawiro",
      },
    },
    {
      id: 2,
      date_created: "2020-12-14",
      department_id: 3,
      type: 2,
      status: 9,
      urgency: 1,
      title: "Request for November 2020 New Joiners List",
      notes:
        "I'd like to request for a list of new joiners in November 2020 for research purposes. Thanks.",
      resolver_info: {
        resolver_id: "BNS12341",
        resolver_name: "Hamish Daud",
      },
    },
  ],
};

const ticket_details = {
  message: "success",
  status: 200,
  data: {
    id: 3,
    date_created: "2020-12-14",
    department_id: 2,
    type: 1,
    status: 9,
    urgency: 0,
    title: "VPN access request",
    notes: "VPN access request for nicholas.saputra@binus.ac.id",
    resolver_info: {
      resolver_id: "BNS12345",
      resolver_name: "Mirna Sumopawiro",
    },
  },
};

const payslip_details = {
  message: "success",
  status: 200,
  data: {
    month: "November",
    year: "2020",
    basic_salary: 10000000,
    take_home_pay: 13705000,
    total_allowance: 5000000,
    total_deduction: 1295000,
    total_benefit: 429000,
    allowances: [
      {
        name: "Tunjangan Hari Raya (THR)",
        amount: 5000000,
      },
    ],
    deductions: [
      {
        name: "Government Tax",
        amount: 1200000,
      },
      {
        name: "Health Insurance Fee",
        amount: 95000,
      },
    ],
    benefits: [
      {
        name: "Company Pension",
        amount: 186000,
      },
      {
        name: "Health Insurance",
        amount: 243000,
      },
    ],
  },
};

const payroll_info = {
  message: "success",
  status: 200,
  data: {
    account_no: "999999999999",
    account_name: "Mirna Sumopawiro",
    bpjs_ketenagakerjaan_no: "99999999999",
    bpjs_kesehatan_no: "99999999999",
    npwp: "99.999.999.9-999.999",
  },
};

const attendance_list = {
  message: "success",
  status: 200,
  data: {
    month: "December",
    year: 2020,
    attendance_record: [
      {
        date: "2020-12-10",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:32",
        check_out: "16:01",
        overtime: "00:00",
      },
      {
        date: "2020-12-09",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:12",
        check_out: "16:21",
        overtime: "00:00",
      },
      {
        date: "2020-12-08",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:53",
        check_out: "17:32",
        overtime: "00:32",
      },
      {
        date: "2020-12-07",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:22",
        check_out: "16:21",
        overtime: "00:00",
      },
      {
        date: "2020-12-06",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:41",
        check_out: "16:52",
        overtime: "00:00",
      },
      {
        date: "2020-12-05",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:38",
        check_out: "17:49",
        overtime: "00:49",
      },
      {
        date: "2020-12-04",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:42",
        check_out: "17:09",
        overtime: "00:00",
      },
      {
        date: "2020-12-03",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:29",
        check_out: "17:49",
        overtime: "00:00",
      },
      {
        date: "2020-12-02",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:14",
        check_out: "16:23",
        overtime: "00:00",
      },
      {
        date: "2020-12-01",
        schedule_in: "08:00",
        schedule_out: "17:00",
        check_in: "07:36",
        check_out: "18:53",
        overtime: "01:53",
      },
    ],
  },
};

const employee_directory = {
  message: "success",
  status: 200,
  employee_list: [
    {
      id: "BNS12343",
      first_name: "Ashanty",
      last_name: "",
      department_name: "Finance",
      job_name: "Budget & Controlling Manager",
      email: "ashanty@binus.ac.id",
      profile_picture_url: "https://bit.ly/3gTvC7p",
    },
    {
      id: "BNS12342",
      first_name: "Chelsea",
      last_name: "Islan",
      department_name: "Product",
      job_name: "Product Manager",
      email: "chelsea.islan@binus.ac.id",
      profile_picture_url: "",
    },
    {
      id: "BNS12341",
      first_name: "Hamish",
      last_name: "Daud",
      department_name: "People",
      job_name: "Recruiter",
      email: "hamish.daud@binus.ac.id",
      profile_picture_url: "https://bit.ly/37qsxsx",
    },
    {
      id: "BNS12345",
      first_name: "Mirna",
      last_name: "Sumopawiro",
      department_name: "Technology",
      job_name: "Software Engineer",
      email: "mirna.sumopawiro@binus.ac.id",
      profile_picture_url: "https://bit.ly/3ajtpBc",
    },
    {
      id: "BNS12344",
      first_name: "Nicholas",
      last_name: "Saputra",
      department_name: "Product Design",
      job_name: "UX Designer Intern",
      email: "nicholas.saputra@binus.ac.id",
      profile_picture_url: "https://bit.ly/34iizHR",
    },
  ],
};

export default {
  login,
  logout,
  announcements,
  my_profile,
  reimbursement_list,
  reimbursement_details,
  ticket_list,
  ticket_details,
  payslip_details,
  payroll_info,
  attendance_list,
  employee_directory,
};

// status
// 10: active
// 9 : done
// 5: on_progress
// 0: inactive

// reimbursement type list
// 0: Others
// 1: Medical Expense
// 2: Business Expense
// 3: Travel Expense

// ticket type list
// 0: Others
// 1: Access Request
// 2: Document Request
// 3: Lost and Found

// urgency
// 0: low
// 1: medium
// 2: high

// department list
// Finance: 1
// IT: 2
// People: 3
