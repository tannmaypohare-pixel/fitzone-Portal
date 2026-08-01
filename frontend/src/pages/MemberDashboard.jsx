import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberDashboard.css";


function MemberDashboard() {


    const navigate = useNavigate();

    const [user, setUser] = useState(null);



    useEffect(() => {


        const storedUser = localStorage.getItem("user");


        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }


    }, []);





    const logout = () => {


        localStorage.removeItem("token");

        localStorage.removeItem("user");

        localStorage.removeItem("isLoggedIn");


        navigate("/");


    };





    return (


        <div className="member-dashboard">



            <header className="member-header">


                <div>


                    <h1>

                        Welcome back, {user?.name || "Member"} 👋

                    </h1>


                    <p>

                        Your FitZone fitness journey

                    </p>


                </div>




                <button onClick={logout}>

                    Logout

                </button>



            </header>





            <section className="member-profile">



                <div className="profile-avatar">

                    💪

                </div>




                <div>


                    <h2>

                        {user?.name || "FitZone Member"}

                    </h2>


                    <span>

                        {user?.email || "member@email.com"}

                    </span>


                </div>




                <div className="active-badge">

                    ACTIVE

                </div>



            </section>







            <section className="member-cards">



                <div className="member-card membership-card">


                    <h3>

                        💳 Membership

                    </h3>



                    <h2>

                        No Active Plan

                    </h2>



                    <p>

                        Choose a membership plan to continue

                    </p>



                </div>







                <div className="member-card">


                    <h3>

                        📅 Attendance

                    </h3>



                    <h1>

                        0

                    </h1>



                    <p>

                        Gym visits this month

                    </p>



                </div>







                <div className="member-card">


                    <h3>

                        💰 Payments

                    </h3>



                    <h1>

                        ₹0

                    </h1>



                    <p>

                        Payment history

                    </p>



                </div>




            </section>








            <section className="member-actions">



                <button

                    onClick={() => navigate("/membership-plans")}

                >

                    💳 Choose Membership Plan

                </button>





                <button

                    onClick={() => navigate("/payments")}

                >

                    📄 View Payments

                </button>



            </section>








            <section className="member-extra">



                <h2>

                    Today's Fitness Goal 🏋

                </h2>




                <div className="goal-box">


                    <p>

                        Complete your workout and maintain consistency.

                    </p>



                </div>



            </section>





        </div>


    );


}


export default MemberDashboard;