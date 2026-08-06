import { Outlet } from "react-router-dom";
import "./Layout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      <Outlet />
    </div>
  );
}

export default MainLayout;
