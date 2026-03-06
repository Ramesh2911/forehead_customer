import {
  BrowserRouter,
  Routes,
  Route
}
  from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from "./components/ScrollToTop";

//page 
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Subcription from "./pages/Subcription/Subcription";
import PrivacyPolicy from "./pages/Privacy/PrivacyPolicy";
import Terms from "./pages/Terms/Terms";
import About from "./pages/About/About";
import Ticket from "./pages/Ticket/Ticket";
import Support from "./pages/Support/Support";
import TypeRetailers from "./pages/Ticket/TypeRetailers";
import TicketUpload from "./pages/Ticket/TicketUpload";
import TicketHistory from "./pages/Ticket/TicketHistory";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/subscription" element={<Subcription />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/ticket"
              element={
                <ProtectedRoute>
                  <Ticket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/type-retailers"
              element={
                <ProtectedRoute>
                  <TypeRetailers />
                </ProtectedRoute>
              }
            />
             <Route
              path="/ticket-upload"
              element={
                <ProtectedRoute>
                  <TicketUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ticket-history"
              element={
                <ProtectedRoute>
                  <TicketHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/support" element={<Support />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
