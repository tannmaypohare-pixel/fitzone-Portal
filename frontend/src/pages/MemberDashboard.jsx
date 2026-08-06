import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberDashboard.css";
import MemberTrainers from "../components/MemberTrainers";


function MemberDashboard() {


    const navigate = useNavigate();


    const [user, setUser] = useState(null);

    const [member, setMember] = useState(null);

    const [payment, setPayment] = useState(null);

    const [loading, setLoading] = useState(true);





    useEffect(() => {


        const storedUser = localStorage.getItem("user");

        const token = localStorage.getItem("token");



        if(storedUser){

            setUser(JSON.parse(storedUser));

        }





        const fetchMember = async()=>{


            try{


                const response = await axios.get(

                    "http://localhost:5001/api/members/profile",

                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }

                );



                console.log(
                    "LOGGED MEMBER DATA:",
                    response.data
                );



                setMember(response.data.member);

                setPayment(response.data.payment);



            }
            catch(error){

                console.log(
                    "STATUS:",
                    error.response?.status
                );


                console.log(
                    "ERROR DATA:",
                    JSON.stringify(
                        error.response?.data,
                        null,
                        2
                    )
                );

            }

            finally{

                setLoading(false);

            }


        };



        fetchMember();



    }, []);









    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        localStorage.removeItem("isLoggedIn");


        navigate("/");

    };









    const getGreeting = () => {

        const hour = new Date().getHours();


        if(hour < 12)
            return "Good morning";


        if(hour < 17)
            return "Good afternoon";


        return "Good evening";

    };









    const formatMembership = (plan) => {

        if(!plan)
            return "No Active Plan";


        if(plan === "3 Month")
            return "3 Months";


        if(plan === "6 Month")
            return "6 Months";


        if(plan === "12 Month")
            return "12 Months";


        return plan;

    };









    const getDaysLeft = ()=>{


        if(!member?.expiryDate)

            return 0;



        const today = new Date();

        const expiry = new Date(member.expiryDate);


        const diff = expiry - today;



        return Math.ceil(

            diff / (1000 * 60 * 60 * 24)

        );


    };







    const isActive = getDaysLeft() > 0;







    if(loading){


        return (

            <div className="member-dashboard member-dashboard--loading">

                <div className="loading-spinner"/>

            </div>

        );

    }







return (

<div className="member-dashboard">





<header className="member-header">


<div className="member-header__text">


<span className="member-greeting">

{getGreeting()}

</span>




<h1>

Welcome, {user?.name || "Member"} 👋

</h1>




<p>
Manage your FitZone membership
</p>


</div>





<button

className="logout-btn"

onClick={logout}

>

🚪 Logout

</button>



</header>









<section className="member-profile">


<div className="profile-avatar">

💪

</div>





<div className="profile-info">


<h2>

{user?.name || "FitZone Member"}

</h2>




<span className="profile-email">

{user?.email || "member@email.com"}

</span>



</div>






<div className="active-badge">


<span className="active-dot"/>


{

isActive

?

"ACTIVE"

:

"EXPIRED"

}


</div>



</section>









<section className="member-cards">





<div className="member-card">


<div className="card-icon">

📋

</div>




<h3>
Membership
</h3>





<h2>

{
formatMembership(member?.membershipType)
}

</h2>





<p>


{

isActive

?

`${getDaysLeft()} days remaining`

:

"No active membership"

}



</p>



</div>









<div className="member-card">


<div className="card-icon">

💳

</div>




<h3>
Payments
</h3>




<h2>

₹{payment?.amount || 0}

</h2>




<p>
Latest payment
</p>



</div>






</section>









<section className="member-actions">


<button

className="action-btn action-btn--primary"

onClick={()=>navigate("/membership-plans")}

>

📋 View Membership Plans

</button>






<button

className="action-btn action-btn--secondary"

onClick={()=>navigate("/payments")}

>

💳 View My Payments

</button>



</section>








<MemberTrainers />





</div>

);


}


export default MemberDashboard;