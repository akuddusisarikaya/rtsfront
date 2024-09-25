//import logo from './logo.svg';
import React from "react";
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
//import AdminPayments from "./Pages/zzexpectedDevPages/AdminPayments";
//import AdminReports from "./Pages/zzexpectedDevPages/AdminReports";
import AdminSettings from "./Pages/adminPages/AdminSettings";
import AdminProfile from "./Pages/adminPages/AdminProfile";
import AdminUserManProviders from "./Pages/adminPages/AdminUserManProviders";
import AdminUserManManagers from "./Pages/adminPages/AdminUserManManagers";
import AdminManageAppointments from "./Pages/adminPages/AdminManageAppointments";
import AdminManCustomers from "./Pages/adminPages/AdminManCustomers";
//import AdminUserDetail from "./Pages/adminPages/AdminUserDetail";
import AdminUserDetailEdit from "./Pages/adminPages/AdminUserDetailEdit";
import AdminAddNewProvider from "./Pages/adminPages/AdminAddNewProvider";
import AdminServiceDetail from "./Pages/adminPages/AdminServiceDetail";
import AdminServiceEdit from "./Pages/adminPages/AdminServiceEdit";
//import AdminAppointmentDetail from "./Pages/adminPages/AdminAppointmetDetail";
import AdminAppointmentEdit from "./Pages/adminPages/AdminAppointmentEdit";
import AdminPaymentList from "./Pages/zzexpectedDevPages/AdminPaymentList";
import AdminAddAppointment from "./Pages/adminPages/AdminAddAppointment";
import AdminServiceList from "./Pages/adminPages/AdminServiceList";
import AdminAddService from "./Pages/adminPages/AdminAddService"
import Prices from "./Pages/Prices";
import NumberVer from "./Pages/NumberVer";
import EmailVer from "./Pages/EmailVer";
import UserProfile from "./Pages/UserProfile";
import UserProfileEdit from "./Pages/UserProfileEdit";
import SuperUser from "./Pages/superuserPages/SuperUser";
import SuperUserAddCompany from "./components/superUserPages/SuperUserAddCompany";
import SuperUserAddAdmin from "./components/superUserPages/SuperUserAddAdmin";
import ProviderDashboard from "./Pages/providerPages/ProviderDashboard";
import ProviderAppointment from "./Pages/providerPages/ProviderAppointment";
import ProviderServices from "./Pages/providerPages/ProviderServices";
import ProviderReports from "./Pages/providerPages/ProviderReports"
import ProviderProfile from "./Pages/providerPages/ProviderProfile";
import SuperUserLogin from "./Pages/superuserPages/SuperUserLogin";
import SuperuserCompanyEdit from "./Pages/superuserPages/SuperuserCompanyEdit";
import SuperUserAdminEdit from "./Pages/superuserPages/SuperuserAdminEdit";
import ProviderLogin from "./Pages/providerPages/ProviderLogin";
import ProviderWorkingDates from "./Pages/providerPages/ProviderWorkingDates";
import ManagerLogin from "./Pages/ManagerLogin";
import ProviderAppOfDays from "./Pages/providerPages/ProviderAppOfDays";
import AdminLinkCreator from "./Pages/adminPages/AdminLinkCreator";
import ProviderAddService from "./Pages/providerPages/ProviderAddService";
import ProviderServiceList from "./Pages/providerPages/ProviderServiceList";
import AdminAppOfDay from "./Pages/adminPages/AdminAppOfDay";
import EditUser from "./components/EditUser";
import ManagerDashboard from "./Pages/managerPages/ManagerDashboard";
import ManagerUser from "./Pages/managerPages/ManagerUser";
import ManagerServices from "./Pages/managerPages/ManagerServices";
import ManagerAppointments from "./Pages/managerPages/ManagerAppointments";
import ManagerProfile from "./Pages/managerPages/ManagerProfile";
import AppointmentDetail from "./components/AppointmentDetail";
import UserDetail from "./components/UserDetail";
import ManagerWorkingDays from "./Pages/managerPages/ManagerWorkingDays";
import ManagerAppOfDay from "./Pages/managerPages/ManagerAppOfDay";
import ManagerAddService from "./Pages/managerPages/ManagerAddService";
import AdminWorkingDay from "./Pages/adminPages/AdminWorkingDays";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/appointment" element = { <Appointment/>}/>
        <Route exact path="/appointment/:companyID" element={<Appointment />} />
        <Route exact path="/resetpassword" element={<PasswordReset />} />
        <Route exact path="/adminusermanage" element={<AdminUserManage />} />
        <Route exact path="/edituser/:userEmail" element={<EditUser />} />
        <Route exact path="/adminservicesandprice" element={<AdminServicesAndPrices />} />
        <Route exact path="/adminappointments" element={<AdminAppointments />} />
        {/*<Route exact path="/adminpayments" element={<AdminPayments />} />*/} 
        {/*<Route exact path="/adminreports" element={<AdminReports />} />*/}
        <Route exact path="/adminsettings" element={<AdminSettings />} />
        <Route exact path="/adminprofile" element={<AdminProfile />} />
        <Route exact path="/providerslist" element={<AdminUserManProviders />} />
        <Route exact path="/managerlist" element={<AdminUserManManagers/>} />
        <Route exact path="/appointmentlist" element={<AdminManageAppointments />} />
        <Route exact path="/adminmancustomers" element={<AdminManCustomers />} />
        <Route exact path="/adminuserdetail/:userEmail" element={<UserDetail />} />
        <Route exact path="/adminuserdetailedit" element={<AdminUserDetailEdit />} />
        <Route exact path="/newprovider" element={<AdminAddNewProvider />} />
        <Route exact path="/adminservicedetails" element={<AdminServiceDetail />} />
        <Route exact path="/adminserviceedit" element={<AdminServiceEdit />} />
        <Route exact path="/adminappointmentdetail/:appointmentId" element={<AppointmentDetail/>} />
        <Route exact path="/adminappointmentedit" element={<AdminAppointmentEdit />} />
        <Route exact path="/adminpaymentlist" element={<AdminPaymentList />} />
        <Route exact path="/adminaddappointment" element={<AdminAddAppointment />} />
        <Route exact path="/servicelist" element={<AdminServiceList/>} />
        <Route exact path="/addservice" element={<AdminAddService/>} />
        <Route exact path="/prices" element={<Prices/>} />
        <Route exact path="/numberver" element={<NumberVer/>} />
        <Route exact path="/emailver" element={<EmailVer/>} />
        <Route exact path="/userprofile" element={<UserProfile/>} />
        <Route exact path="/userprofileedit" element={<UserProfileEdit/>} />
        <Route exact path="/superuserdash" element={<SuperUser/>} />
        <Route exact path="/superusercompanyadd" element={<SuperUserAddCompany />} />
        <Route exact path="/superuseradminadd" element={< SuperUserAddAdmin />} />
        <Route exact path="/provider" element={<ProviderDashboard />} />
        <Route exact path="/providerappointment" element={<ProviderAppointment />} />
        <Route exact path="/providerservices" element={<ProviderServices/>} />
        <Route exact path="/providerreports" element={<ProviderReports/>} />
        <Route exact path="/providerprofile" element={<ProviderProfile/>} />
        <Route exact path="/superuser" element={<SuperUserLogin />} />
        <Route exact path="/providerlogin" element={<ProviderLogin/>}/>
        <Route exact path="/superusercompanyedit" element={<SuperuserCompanyEdit/> } />
        <Route exact path="/superuseradminedit" element={<SuperUserAdminEdit />} />
        <Route exact path="/providerworkingdates" element={<ProviderWorkingDates />} />
        <Route exact path="/managerlogin" element={<ManagerLogin />} />
        <Route exact path="/appofday" element={<ProviderAppOfDays />} />
        <Route exact path="/adminlinkcreate" element={<AdminLinkCreator />} />
        <Route exact path="/provideraddservice" element={<ProviderAddService />} />
        <Route exact path="/providerservicelist" element={<ProviderServiceList />} />
        <Route exact path="/appofdayadmin" element={<AdminAppOfDay />} />
        <Route exact path="/manager" element={<ManagerDashboard />} />
        <Route exact path="/manageruser" element={<ManagerUser/>}/>
        <Route exact path="/managerservices" element={<ManagerServices/>}/>
        <Route exact path="/managerappointments" element={<ManagerAppointments />} />
        <Route exact path="/managerprofile" element={<ManagerProfile />} />
        <Route exact path="/managerworkdays" element={<ManagerWorkingDays />} />
        <Route exact path="/managerappofday" element={<ManagerAppOfDay />} />
        <Route exact path="/manageraddservice" element={<ManagerAddService/>}/>
        <Route exact path="/adminworkdays" element={<AdminWorkingDay />} />
      </Routes>
    </Router>
  );
}

export default App;
