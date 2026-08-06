import { NavLink } from "react-router-dom";
import "./Sidebar.css";


const menuItems = [

    {
        name: "Dashboard",
        icon: "🏠",
        path: "/member-dashboard"
    },

    {
        name: "My Trainer",
        icon: "🏋️",
        path: "/member-trainer"
    },

    {
        name: "Membership Plans",
        icon: "📋",
        path: "/membership-plans"
    },

    {
        name: "My Payments",
        icon: "💳",
        path: "my/payments"
    },

    {
        name: "My Profile",
        icon: "👤",
        path: "/profile"
    }

];


function MemberSidebar() {


    return (

        <aside className="sidebar">


            <div className="sidebar-brand">


                <div className="brand-logo">
                    🏋️
                </div>


                <div className="brand-text">

                    <h2>
                        FitZone
                    </h2>


                    <p>
                        Member Portal
                    </p>

                </div>


            </div>





            <nav className="sidebar-menu">


                {
                    menuItems.map((item)=>(


                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({isActive}) =>
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


                    ))
                }


            </nav>


        </aside>

    );

}


export default MemberSidebar;