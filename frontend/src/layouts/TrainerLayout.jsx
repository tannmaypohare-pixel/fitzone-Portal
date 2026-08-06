import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Layout.css";

function TrainerLayout() {
  return (
    <div className="layout-container">
      <Sidebar />

      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default TrainerLayout;
