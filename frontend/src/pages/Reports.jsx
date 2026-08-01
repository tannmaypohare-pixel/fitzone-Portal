import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./Reports.css";


function Reports() {


  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    expiredPlans: 0,
    revenue: 0
  });



  const [revenueData, setRevenueData] = useState([]);

  const [memberGrowthData, setMemberGrowthData] = useState([]);

  const [planData, setPlanData] = useState([]);




  useEffect(() => {


    const fetchReports = async () => {


      try {


        const statsResponse = await axios.get(
          "http://localhost:5001/api/dashboard/stats"
        );

        setStats(statsResponse.data);




        const revenueResponse = await axios.get(
          "http://localhost:5001/api/reports/revenue"
        );

        setRevenueData(revenueResponse.data);





        const growthResponse = await axios.get(
          "http://localhost:5001/api/reports/member-growth"
        );

        setMemberGrowthData(growthResponse.data);





        const planResponse = await axios.get(
          "http://localhost:5001/api/reports/plans"
        );

        setPlanData(planResponse.data);



      } catch(error) {


        console.log("Reports error:", error);


      }


    };



    fetchReports();



  }, []);








  return (


    <div className="reports-page">



      <h1 className="reports-title">
        Reports Dashboard
      </h1>





      <div className="report-cards">



        <div className="report-card">

          <h3>Total Members</h3>

          <h2>
            {stats.totalMembers}
          </h2>

        </div>





        <div className="report-card">

          <h3>Active Members</h3>

          <h2>
            {stats.activeMembers}
          </h2>

        </div>





        <div className="report-card">

          <h3>Total Revenue</h3>

          <h2>
            ₹{stats.revenue}
          </h2>

        </div>





        <div className="report-card">

          <h3>Expired Plans</h3>

          <h2>
            {stats.expiredPlans}
          </h2>

        </div>



      </div>









      <div className="report-sections">






        <div className="report-box">


          <h2>
            Revenue Overview
          </h2>



          <ResponsiveContainer width="100%" height={250}>


            <LineChart data={revenueData}>


              <CartesianGrid />


              <XAxis dataKey="month" />


              <YAxis />


              <Tooltip />



              <Line
                type="monotone"
                dataKey="revenue"
              />


            </LineChart>


          </ResponsiveContainer>



        </div>








        <div className="report-box">


          <h2>
            Member Growth
          </h2>




          <ResponsiveContainer width="100%" height={250}>


            <BarChart data={memberGrowthData}>


              <CartesianGrid />


              <XAxis dataKey="month" />


              <YAxis />


              <Tooltip />



              <Bar
                dataKey="members"
              />


            </BarChart>



          </ResponsiveContainer>



        </div>






      </div>








      <div className="report-box">


        <h2>
          Membership Plan Distribution
        </h2>




        <ResponsiveContainer width="100%" height={300}>


          <PieChart>


            <Pie

              data={planData}

              dataKey="members"

              nameKey="plan"

              cx="50%"

              cy="50%"

              outerRadius={100}

              label

            >


              {
                planData.map((entry,index)=>(
                  <Cell 
                    key={`cell-${index}`}
                  />
                ))
              }


            </Pie>



            <Tooltip />


          </PieChart>



        </ResponsiveContainer>


      </div>









      <div className="report-box expiry">


        <h2>
          Expiring Memberships
        </h2>





        <table>


          <thead>

            <tr>

              <th>Name</th>

              <th>Plan</th>

              <th>Expiry Date</th>


            </tr>

          </thead>





          <tbody>


            <tr>

              <td>
                No Data
              </td>


              <td>
                -
              </td>


              <td>
                -
              </td>


            </tr>


          </tbody>



        </table>


      </div>






    </div>


  );


}



export default Reports;