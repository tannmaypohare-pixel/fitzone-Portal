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

const PIE_COLORS = ["#9333ea", "#6366f1", "#c084fc", "#4ade80", "#f472b6", "#38bdf8"];

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
  const [expiringMembers, setExpiringMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const expiringResponse = await axios.get(
          "http://localhost:5001/api/reports/expiring"
        );

        setExpiringMembers(expiringResponse.data);

      } catch(error) {

        console.log("Reports error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchReports();

  }, []);

  if (loading) {
    return (
      <div className="reports-page reports-page--loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (

    <div className="reports-page">

      <div className="reports-header">
        <h1 className="reports-title">
          Reports Dashboard
        </h1>
        <p className="reports-subtitle">
          Track members, revenue, and plan performance at a glance
        </p>
      </div>

      <div className="report-cards">

        <div className="report-card">
          <div className="report-card__icon">👥</div>
          <h3>Total Members</h3>
          <h2>{stats.totalMembers}</h2>
        </div>

        <div className="report-card">
          <div className="report-card__icon">✅</div>
          <h3>Active Members</h3>
          <h2>{stats.activeMembers}</h2>
        </div>

        <div className="report-card">
          <div className="report-card__icon">💰</div>
          <h3>Total Revenue</h3>
          <h2>₹{stats.revenue}</h2>
        </div>

        <div className="report-card report-card--warning">
          <div className="report-card__icon">⏳</div>
          <h3>Expired Plans</h3>
          <h2>{stats.expiredPlans}</h2>
        </div>

      </div>

      <div className="report-sections">

        <div className="report-box">

          <h2>Revenue Overview</h2>

          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid stroke="#2a2a3d" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{ background: "#18182b", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "10px" }}
                  labelStyle={{ color: "#c084fc" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={{ fill: "#c084fc", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">No revenue data available</div>
          )}

        </div>

        <div className="report-box">

          <h2>Member Growth</h2>

          {memberGrowthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={memberGrowthData}>
                <CartesianGrid stroke="#2a2a3d" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{ background: "#18182b", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "10px" }}
                  labelStyle={{ color: "#c084fc" }}
                  cursor={{ fill: "rgba(168,85,247,0.08)" }}
                />
                <Bar
                  dataKey="members"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">No growth data available</div>
          )}

        </div>

      </div>

      <div className="report-box">

        <h2>Membership Plan Distribution</h2>

        {planData.length > 0 ? (
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
                  planData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))
                }
              </Pie>

              <Tooltip
                contentStyle={{ background: "#18182b", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">No plan data available</div>
        )}

      </div>

      <div className="report-box expiry">

        <h2>Expiring Memberships</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan</th>
              <th>Expiry Date</th>
            </tr>
          </thead>

          <tbody>
            {expiringMembers.length > 0 ? (
              expiringMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.plan}</td>
                  <td>{new Date(member.expiryDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="no-data-cell">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>

  );

}

export default Reports;