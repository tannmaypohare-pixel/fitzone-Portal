import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";


function formatRevenue(amount) {

  if (amount >= 10000000)
    return `₹${(amount / 10000000).toFixed(1)}Cr`;

  if (amount >= 100000)
    return `₹${(amount / 100000).toFixed(1)}L`;

  if (amount >= 1000)
    return `₹${(amount / 1000).toFixed(1)}K`;

  return `₹${amount}`;

}



function getDaysLeft(date) {

  const today = new Date();
  const expiry = new Date(date);

  return Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

}



function Dashboard() {


  const navigate = useNavigate();


  const storedUser = localStorage.getItem("user");


  const user = storedUser
    ? JSON.parse(storedUser)
    : {
        name:"Admin",
        role:"ADMIN"
      };



  const [stats,setStats] = useState({

    totalMembers:0,
    activeMembers:0,
    expiredPlans:0,
    revenue:0

  });



  const [expiringMembers,setExpiringMembers] = useState([]);


  const [loading,setLoading] = useState(true);





  useEffect(()=>{


    fetch("http://localhost:5001/api/dashboard/stats")

    .then(res=>res.json())

    .then(data=>{

      setStats(data);
      setLoading(false);

    })

    .catch(()=>setLoading(false));




    fetch("http://localhost:5001/api/dashboard/expiring")

    .then(res=>res.json())

    .then(data=>{

      setExpiringMembers(data);

    });


  },[]);





  const logout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/");

  };





  const cards=[


    {
      title:"Total Members",
      value:stats.totalMembers,
      description:"Registered members",
      icon:"👥",
      accent:"#10b981"
    },


    {
      title:"Active Memberships",
      value:stats.activeMembers,
      description:"Currently active",
      icon:"✅",
      accent:"#3b82f6"
    },


    {
      title:"Expired Plans",
      value:stats.expiredPlans,
      description:"Need renewal",
      icon:"⏳",
      accent:"#ef4444"
    },


    {
      title:"Revenue",
      value:formatRevenue(stats.revenue),
      description:"Total revenue",
      icon:"💰",
      accent:"#f59e0b",
      revenue:true
    }


  ];





  if(loading){

    return <h1>Loading Dashboard...</h1>;

  }





return (

<div className="dashboard">


<main className="main-content">



<header className="topbar">


<div>

<h1>
Welcome back, {user?.name || "Admin"} 👋
</h1>


<p>
Manage your gym operations with intelligence and speed.
</p>


<small>
Role: {user?.role}
</small>


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
onClick={logout}
>
Logout
</button>


</div>


</header>






<section className="stats">


{
cards.map(card=>(


<article

key={card.title}

className="stat-card"

style={{
borderColor:card.accent
}}

>


<div className="stat-header">


<h3>

{card.icon} {card.title}

</h3>


<span className="stat-badge">
Live
</span>


</div>




<h1 className={card.revenue ? "revenue-value":""}>

{card.value}

</h1>



<p>
{card.description}
</p>


</article>


))
}


</section>








<section className="expiring-section">


<div className="activity-header">


<h2>
⚠️ Expiring Soon
</h2>


<span className="badge pulse-badge">

{expiringMembers.length} Members

</span>


</div>





{
expiringMembers.length===0

?

<p className="empty-state">
No memberships expiring soon 🎉
</p>


:

<div className="table-wrap">


<table className="expiring-table">


<thead>

<tr>

<th>Member</th>
<th>Plan</th>
<th>Expiry Date</th>
<th>Days Left</th>

</tr>

</thead>



<tbody>


{

expiringMembers.map(member=>{


const daysLeft=getDaysLeft(member.expiryDate);



return (

<tr key={member._id}>


<td className="member-name">
{member.name}
</td>


<td>
💳 {member.membershipType}
</td>


<td>
📅 {new Date(member.expiryDate).toLocaleDateString()}
</td>



<td>

<span className="days-left">

⏳ {daysLeft} days

</span>


</td>


</tr>


)


})

}


</tbody>


</table>


</div>


}


</section>









<section className="vitals">


<div className="activity-header">


<h2>
Gym Pulse
</h2>


<span className="badge pulse-badge">

<span className="pulse-dot"></span>

Live

</span>


</div>




<div className="vitals-body">


<div className="heart-rate">


<span className="heart-icon">

❤️

</span>



<div>


<h1>

{stats.activeMembers > 0 ? "72" : "--"}

<small>
 bpm
</small>

</h1>



<p>
Live activity rate
</p>


</div>


</div>





<div className="ecg-wrap">


<svg

className="ecg-line"

viewBox="0 0 600 100"

preserveAspectRatio="none"

>


<polyline

className="ecg-path"

fill="none"

points="
0,50 
40,50 
55,20 
70,80 
85,50 
130,50 
150,50 
165,10 
180,90 
195,50 
240,50 
260,50 
275,20 
290,80 
305,50 
350,50 
370,50 
385,10 
400,90 
415,50 
460,50 
480,50 
495,20 
510,80 
525,50 
570,50 
600,50
"

/>


</svg>


</div>


</div>






</section>





</main>


</div>


);


}


export default Dashboard;