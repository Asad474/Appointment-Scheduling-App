import {Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import ConsultantPrivateRoute from "./components/ConsultantPrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AppointmentPage from "./pages/AppointmentPage";
import ConsultantPage from "./pages/ConsultantPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";

function App() {
  return (
    <>
      <Header />

      <ToastContainer />

      <Routes>
        <Route exact path="/" element={ <HomePage /> }></Route>
        <Route path="/login" element={ <LoginPage /> }></Route>
        <Route path="/register" element={ <RegisterPage /> }></Route>
        
        <Route element={ <PrivateRoute /> }>
          <Route path="/profile" element={ <ProfilePage /> }></Route>
          <Route path="/appointment" element={ <AppointmentPage /> }></Route>

          <Route element={ <ConsultantPrivateRoute /> }>
            <Route path="/consultant" element={ <ConsultantPage /> }></Route>
          </Route>

          <Route path="/availabilities" element={ <AvailabilityPage /> }></Route>
          <Route path="/myappointments" element={ <MyAppointmentsPage /> }></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;