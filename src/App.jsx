import {
  BrowserRouter,
  Routes,
  Route
}
  from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//page 
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Subcription from "./pages/Subcription/Subcription";


function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/subcription" element={<Subcription />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
