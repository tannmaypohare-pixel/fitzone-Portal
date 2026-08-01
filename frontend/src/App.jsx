import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Trainers from "./pages/Trainers";
import MembershipPlans from "./pages/MembershipPlans";
import Payments from "./pages/Payments";
import Unauthorized from "./pages/Unauthorized";

import MemberDashboard from "./pages/MemberDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";


function App() {

  return (

    <Routes>


      {/* PUBLIC ROUTES */}

      <Route path="/" element={<Login />} />

      <Route 
        path="/register" 
        element={<Register />} 
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />



      {/* ADMIN ROUTES */}


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/members"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Members />
          </ProtectedRoute>
        }
      />


      <Route
        path="/add-member"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AddMember />
          </ProtectedRoute>
        }
      />


      <Route
        path="/trainers"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Trainers />
          </ProtectedRoute>
        }
      />


      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Reports />
          </ProtectedRoute>
        }
      />


      {/* ADMIN MEMBERSHIP PLANS */}

      <Route
        path="/membership"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MembershipPlans />
          </ProtectedRoute>
        }
      />



      {/* ADMIN + MEMBER PAYMENTS */}

      <Route
        path="/payments"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "MEMBER"]}>
            <Payments />
          </ProtectedRoute>
        }
      />



      {/* MEMBER ROUTES */}


      <Route
        path="/membership-plans"
        element={
          <ProtectedRoute allowedRoles={["MEMBER"]}>
            <MembershipPlans />
          </ProtectedRoute>
        }
      />


      <Route
        path="/member-dashboard"
        element={
          <ProtectedRoute allowedRoles={["MEMBER"]}>
            <MemberDashboard />
          </ProtectedRoute>
        }
      />


    </Routes>

  );

}


export default App;