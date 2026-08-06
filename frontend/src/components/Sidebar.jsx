import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
    {
        name: "Dashboard",
        icon: "🏠",
        path: "/dashboard"
    },
    {
        name: "Members",
        icon: "👥",
        path: "/members"
    },
    {
        name: "Add Member",
        icon: "➕",
        path: "/add-member"
    },
    {
        name: "Trainers",
        icon: "🏋️",
        path: "/trainers"
    },
    {
        name: "Membership",
        icon: "📋",
        path: "/membership"
    },
    {
        name: "Payments",
        icon: "💳",
        path: "/payments"
    },
    {
        name: "Reports",
        icon: "📊",
        path: "/reports"
    }
];

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="sidebar-brand">

                <div className="brand-logo">
                    🏋️
                </div>

                <div className="brand-text">

                    <h2>FitZone</h2>

                    <p>Admin Portal</p>

                </div>

            </div>

            <nav className="sidebar-menu">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >

                        <span className="menu-icon">
                            {item.icon}
                        </span>

                        <span className="menu-text">
                            {item.name}
                        </span>

                    </NavLink>

                ))}

            </nav>

        </aside>

    );

}

export default Sidebar;