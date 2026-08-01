import "./MembersTable.css";

function MembersTable({ members = [], onEdit, onDelete }) {

    return (
        <div className="table-container">

            <div className="table-title">
                <h2>Member List</h2>
                <p>Total Members: {members.length}</p>
            </div>


            <table className="members-table">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Plan</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>


                <tbody>

                    {members.length === 0 ? (

                        <tr>
                            <td colSpan="7" className="no-data">
                                No Members Found
                            </td>
                        </tr>

                    ) : (

                        members.map((member) => (

                            <tr key={member._id}>

                                <td>{member.name}</td>

                                <td>{member.phone}</td>

                                <td>
                                    {member.email || "N/A"}
                                </td>

                                <td>
                                    {member.membershipType}
                                </td>


                                <td>
                                    {new Date(member.expiryDate)
                                        .toLocaleDateString()}
                                </td>


                                <td>
                                    <span
                                        className={
                                            member.status === "Active"
                                            ? "active-status"
                                            : "expired-status"
                                        }
                                    >
                                        {member.status}
                                    </span>
                                </td>


                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(member)}
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(member._id)}
                                    >
                                        Delete
                                    </button>

                                </td>


                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}


export default MembersTable;