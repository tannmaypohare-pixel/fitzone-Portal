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
import MemberPlans from "./pages/MemberPlans";
import Payments from "./pages/Payments";
import Unauthorized from "./pages/Unauthorized";

import MemberDashboard from "./pages/MemberDashboard";
import MemberTrainer from "./pages/MemberTrainer";
import Profile from "./pages/Profile";

import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";


function App() {

  return (

    <Routes>


      {/* PUBLIC ROUTES */}

      <Route element={<MainLayout />}>

        <Route 
          path="/" 
          element={<Login />} 
        />

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

      </Route>





      {/* ADMIN ROUTES */}

      <Route

        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }

      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        <Route
          path="/members"
          element={<Members />}
        />


        <Route
          path="/add-member"
          element={<AddMember />}
        />


        <Route
          path="/trainers"
          element={<Trainers />}
        />


        {/* ADMIN PLAN MANAGEMENT */}

        <Route
          path="/membership"
          element={<MembershipPlans />}
        />


        <Route
          path="/payments"
          element={<Payments />}
        />


        <Route
          path="/reports"
          element={<Reports />}
        />

      </Route>







      {/* MEMBER ROUTES */}

      <Route

        element={
          <ProtectedRoute allowedRoles={["MEMBER"]}>
            <MemberLayout />
          </ProtectedRoute>
        }

      >

        <Route
          path="/member-dashboard"
          element={<MemberDashboard />}
        />


        <Route
          path="/member-trainer"
          element={<MemberTrainer />}
        />


        {/* MEMBER PLAN VIEW */}

        <Route
          path="/membership-plans"
          element={<MemberPlans />}
        />


        <Route
          path="/my-payments"
          element={<Payments />}
        />


        <Route
          path="/profile"
          element={<Profile />}
        />

      </Route>







      {/* NOT FOUND */}

      <Route
        path="*"
        element={<NotFound />}
      />


    </Routes>

  );

}


export default App;