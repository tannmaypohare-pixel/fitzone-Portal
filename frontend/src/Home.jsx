import "./Home.css";
import { useNavigate } from "react-router-dom";


const navItems = [
  { label: "Dashboard", icon: "🏠", path: "/dashboard" },
  { label: "Members", icon: "👥", path: "/members" },
  { label: "Trainers", icon: "🏋", path: "/trainers" },
  { label: "Membership", icon: "💳", path: "/membership-plans" },
  { label: "Reports", icon: "📊", path: "/reports" },
];


const stats = [
  {
    title: "Total Members",
    value: "250",
    description: "Registered members",
    accent: "#10b981"
  },
  {
    title: "Active Memberships",
    value: "180",
    description: "Currently active",
    accent: "#3b82f6"
  },
  {
    title: "Expired Plans",
    value: "70",
    description: "Need renewal",
    accent: "#ef4444"
  },
  {
    title: "Revenue",
    value: "₹85K",
    description: "This month",
    accent: "#f59e0b"
  },
];


const activities = [
  "New member registered",
  "Premium plan purchased",
  "Trainer schedule updated",
  "Monthly report ready",
];


function Home() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/");

  };


  return (

    <div className="dashboard">


      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            🏋
          </div>

          <div>
            <h2>FitZone</h2>
            <p>Gym admin panel</p>
          </div>

        </div>



        <nav>

          <ul>

            {
              navItems.map((item)=>(

                <li
                  key={item.label}
                  onClick={()=>navigate(item.path)}
                >

                  <span>{item.icon}</span>
                  <span>{item.label}</span>

                </li>

              ))
            }

          </ul>

        </nav>


      </aside>



      <main className="main-content">


        <header className="topbar">


          <div>

            <h1>
              Welcome back, Admin 👋
            </h1>

            <p>
              Manage your gym operations with intelligence and speed.
            </p>

          </div>



          <div className="topbar-actions">


            <button
              className="secondary-btn"
              onClick={()=>navigate("/add-member")}
            >
              + New member
            </button>



            <button
              className="primary-btn"
              onClick={handleLogout}
            >
              Logout
            </button>


          </div>


        </header>



        <section className="stats">


          {
            stats.map((stat)=>(

              <article
                className="stat-card"
                key={stat.title}
                style={{borderColor:stat.accent}}
              >

                <div className="stat-header">

                  <h3>
                    {stat.title}
                  </h3>

                  <span className="stat-badge">
                    Live
                  </span>

                </div>


                <h1>
                  {stat.value}
                </h1>


                <p>
                  {stat.description}
                </p>


              </article>

            ))
          }


        </section>



        <section className="activity">


          <div className="activity-header">

            <h2>
              Recent Activity
            </h2>

            <span className="badge">
              Latest updates
            </span>

          </div>



          <ul>

            {
              activities.map((item)=>(

                <li key={item}>

                  <span>
                    •
                  </span>

                  <p>
                    {item}
                  </p>

                </li>

              ))
            }

          </ul>


        </section>


      </main>


    </div>

  );

}


export default Home;