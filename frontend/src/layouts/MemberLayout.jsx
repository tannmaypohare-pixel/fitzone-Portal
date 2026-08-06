import { Outlet } from "react-router-dom";
import MemberSidebar from "../components/MemberSidebar";
import "./Layout.css";

function MemberLayout() {
  return (
    <div className="layout-container">
      <MemberSidebar />

      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MemberLayout;