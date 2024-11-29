import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dispute from "./Components/Dispute/Dispute.jsx";
import SignIn from "./Components/SignIn/SignIn";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoaderBars from "./Components/Loader/LoaderBars";
import ForgotPassword from "./Components/ForgotPassword/FrogotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SendEmail from "./Components/SendEmail/SendEmail.jsx";
import Refund from "./Components/Refund/Refund.jsx";
import Order from "./Components/Order/Order.jsx";
import Accounts from "./Components/Accounts/Accounts.jsx";
const App = () => {
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const adminAuthenticatedRoutes = ["/", "/refund", "/order", "/accounts"];
  const location = useLocation();
  useEffect(() => {
    const loadCurrentAdmin = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-current-admin");
        if (response?.data) {
          setAdminAuthenticated(true);
        }
      } catch (error) {
        setAdminAuthenticated(false);
        console.log(error?.response?.data?.message);
      } finally {
        setAdminLoading(false);
      }
    };
    loadCurrentAdmin();
  });
  if (adminLoading && adminAuthenticatedRoutes.includes(location.pathname)) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoaderBars />
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAdminAuthenticated ? <Dispute /> : <Navigate to={"/sign-in"} />
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin-reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="*" element={<Navigate to={"/sign-in"} />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route
          path="/refund"
          element={
            isAdminAuthenticated ? <Refund /> : <Navigate to={"/sign-in"} />
          }
        />
        <Route
          path="/order"
          element={
            isAdminAuthenticated ? <Order /> : <Navigate to={"/sign-in"} />
          }
        />
        <Route
          path="/accounts"
          element={
            isAdminAuthenticated ? <Accounts /> : <Navigate to={"/sign-in"} />
          }
        />
      </Routes>
    </>
  );
};

const allRoutes = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
export default allRoutes;
