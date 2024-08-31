//import logo from './logo.svg';
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Homepage from "./Pages/Homepage";
import AdminDashboard from "./Pages/adminPages/AdminDashboard";
import Appointment from "./Pages/Appointment";
import PasswordReset from "./Pages/PasswordReset";
import AdminUserManage from "./Pages/adminPages/AdminUserManage";
import AdminServicesAndPrices from "./Pages/adminPages/AdminSevicesAndPrices";
import AdminAppointments from "./Pages/adminPages/AdminAppointments";
import AdminPayments from "./Pages/adminPages/AdminPayments";
import AdminReports from "./Pages/adminPages/AdminReports";
import AdminSettings from "./Pages/adminPages/AdminSettings";
import AdminProfile from "./Pages/adminPages/AdminProfile";
import AdminUserManProviders from "./Pages/adminPages/AdminUserManProviders";
import AdminUserManManagers from "./Pages/adminPages/AdminUserManManagers";
import AdminManageAppointments from "./Pages/adminPages/AdminManageAppointments";
import AdminManCustomers from "./Pages/adminPages/AdminManCustomers";
import AdminUserDetail from "./Pages/adminPages/AdminUserDetail";
import AdminUserDetailEdit from "./Pages/adminPages/AdminUserDetailEdit";
import AdminAddNewUser from "./Pages/adminPages/AdminAddNewUser";
import AdminServiceDetail from "./Pages/adminPages/AdminServiceDetail";
import AdminServiceEdit from "./Pages/adminPages/AdminServiceEdit";
import AdminAppointmentDetail from "./Pages/adminPages/AdminAppointmetDetail";
import AdminAppointmentEdit from "./Pages/adminPages/AdminAppointmentEdit";
import AdminPaymentList from "./Pages/adminPages/AdminPaymentList";
import AdminAddAppointment from "./Pages/adminPages/AdminAddAppointment";
import AdminServiceList from "./Pages/adminPages/AdminServiceList";
import AdminAddService from "./Pages/adminPages/AdminAddService"
import Prices from "./Pages/Prices";
import NumberVer from "./Pages/NumberVer";
import EmailVer from "./Pages/EmailVer";
import UserProfile from "./Pages/UserProfile";
import UserProfileEdit from "./Pages/UserProfileEdit";
import SuperUser from "./Pages/SuperUser";
import SuperUserAddCompany from "./components/superUserPages/SuperUserAddCompany";
import SuperUserAddAdmin from "./components/superUserPages/SuperUserAddAdmin";

function App() {
  const [email, setEmail] = useState("");

  const updateEmail = (newEmail) => {
    setEmail(newEmail); // E-posta bilgisini günceller
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login updateEmail={updateEmail} />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/appointment" element={<Appointment />} />
        <Route exact path="/resetpassword" element={<PasswordReset />} />
        <Route exact path="/adminusermanage" element={<AdminUserManage />} />
        <Route
          exact
          path="/adminservicesandprice"
          element={<AdminServicesAndPrices />}
        />
        <Route
          exact
          path="/adminappointments"
          element={<AdminAppointments />}
        />
        <Route exact path="/adminpayments" element={<AdminPayments />} />
        <Route exact path="/adminreports" element={<AdminReports />} />
        <Route exact path="/adminsettings" element={<AdminSettings />} />
        <Route exact path="/adminprofile" element={<AdminProfile />} />
        <Route
          exact
          path="/adminproviderslist"
          element={<AdminUserManProviders />}
        />
        <Route
          exact
          path="/adminmanagerslist"
          element={<AdminUserManManagers />}
        />
        <Route
          exact
          path="/adminmanappointments"
          element={<AdminManageAppointments />}
        />
        <Route
          exact
          path="/adminmancustomers"
          element={<AdminManCustomers />}
        />
        <Route exact path="/adminuserdetail" element={<AdminUserDetail />} />
        <Route
          exact
          path="/adminuserdetailedit"
          element={<AdminUserDetailEdit />}
        />
        <Route exact path="/adminaddnewuser" element={<AdminAddNewUser />} />
        <Route
          exact
          path="/adminservicedetails"
          element={<AdminServiceDetail />}
        />
        <Route exact path="/adminserviceedit" element={<AdminServiceEdit />} />
        <Route
          exact
          path="/adminappointmentdetail"
          element={<AdminAppointmentDetail />}
        />
        <Route
          exact
          path="/adminappointmentedit"
          element={<AdminAppointmentEdit />}
        />
        <Route exact path="/adminpaymentlist" element={<AdminPaymentList />} />
        <Route
          exact
          path="/adminaddappointment"
          element={<AdminAddAppointment />}
        />
        <Route exact path="/adminservicelist" element={<AdminServiceList/>}/>
        <Route exact path="/adminaddservice" element={<AdminAddService/>} />
        <Route exact path="/prices" element={<Prices/>}/>
        <Route exact path="/numberver" element={<NumberVer/>}/>
        <Route exact path="/emailver" element={<EmailVer/>}/>
        <Route exact path="/userprofile" element={<UserProfile/>}/>
        <Route exact path="/userprofileedit" element={<UserProfileEdit  email={email}/>}/>
        <Route exact path="/superuser" element={<SuperUser/>} />
        <Route exact path="/superusercompanyadd" element={<SuperUserAddCompany/>}/>
        <Route exact path="/superuseradminadd" element={< SuperUserAddAdmin/>} />
      </Routes>
    </Router>
  );
}

export default App;
