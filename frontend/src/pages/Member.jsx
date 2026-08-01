import { useState } from "react";
import "./Member.css";

function Member() {

  const [members] = useState([
    {
      id:1,
      name:"Rahul Sharma",
      phone:"9876543210",
      membership:"Gold",
      expiry:"2026-08-10",
      status:"Active"
    },
    {
      id:2,
      name:"Priya Patil",
      phone:"9988776655",
      membership:"Silver",
      expiry:"2026-07-30",
      status:"Expiring Soon"
    }
  ]);

  return (
    <div className="member-page">

      <div className="member-header">
        <h2>Members</h2>

        <button className="add-btn">
          + Add Member
        </button>
      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {members.map(member=>(
            <tr key={member.id}>

              <td>{member.name}</td>
              <td>{member.phone}</td>
              <td>{member.membership}</td>
              <td>{member.expiry}</td>

              <td>
                <span className={member.status==="Active" ? "active" : "expire"}>
                  {member.status}
                </span>
              </td>

              <td>

                <button>Edit</button>
                <button>Delete</button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Member;