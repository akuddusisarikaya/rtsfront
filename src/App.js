//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Homepage from './Pages/Homepage';
import AdminDashboard from './Pages/AdminDashboard';
import Appointment from './Pages/Appointment'
import PasswordReset from './Pages/PasswordReset';
import AdminUserManage from './Pages/AdminUserManage';
import AdminServicesAndPrices from './Pages/AdminSevicesAndPrices'
import AdminAppointments from './Pages/AdminAppointments'
import AdminPayments from './Pages/AdminPayments';
import AdminReports from './Pages/AdminReports';
import AdminSettings from './Pages/AdminSettings';
import AdminProfile from './Pages/AdminProfile';
import AdminUserManProviders from './Pages/AdminUserManProviders'
import AdminUserManManagers from './Pages/AdminUserManManagers'
import AdminManageAppointments from './Pages/AdminManageAppointments'
import AdminManCustomers from './Pages/AdminManCustomers'

function App() {
  return (
  <Router>
    <Routes>
      <Route exact path='/' element={<Homepage/>}/>
      <Route exact path='/login' element={<Login />}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/admin' element={<AdminDashboard/>}/>
      <Route exact path='/appointment' element={<Appointment/>} />
      <Route exact path='/resetpassword' element={<PasswordReset/>} />
      <Route exact path='/adminusermanage' element={<AdminUserManage/>}/>
      <Route exact path='/adminservicesandprice' element={<AdminServicesAndPrices/>} />
      <Route exact path='/adminappointments' element={<AdminAppointments/>} />
      <Route exact path='/adminpayments' element={<AdminPayments/>} />
      <Route exact path='/adminreports' element={<AdminReports/>} />
      <Route exact path='/adminsettings' element={<AdminSettings/>}/>
      <Route exact path='/adminprofile' element={<AdminProfile/>}/>
      <Route exact path='/adminproviderslist' element={<AdminUserManProviders/>}/>
      <Route exact path='/adminmanagerslist' element={<AdminUserManManagers/>}/>
      <Route exact path='/adminmanappointments' element={<AdminManageAppointments/>}/>
      <Route exact path='/adminmancustomers' element={<AdminManCustomers/>}/>
    </Routes>
  </Router>
  );
}

export default App;
