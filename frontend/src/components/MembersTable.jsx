import "./MembersTable.css";


function MembersTable({ members, onEdit, onDelete }) {


    const getStatus = (expiryDate) => {

        if (!expiryDate) {
            return "Expired";
        }


        const today = new Date();

        const expiry = new Date(expiryDate);


        // Remove time difference issue
        today.setHours(0, 0, 0, 0);
        expiry.setHours(0, 0, 0, 0);


        if (expiry <= today) {
            return "Expired";
        }


        return "Active";

    };



    return (

        <div className="table-container">

            <table className="members-table">


                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Plan</th>
                        <th>Expiry</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>



                <tbody>


                    {
                        members.map((member) => {


                            const status = getStatus(member.expiryDate);



                            return (

                                <tr key={member._id}>


                                    <td>{member.name}</td>


                                    <td>{member.phone}</td>


                                    <td>{member.email || "N/A"}</td>


                                    <td>{member.age || "N/A"}</td>


                                    <td>{member.membershipType}</td>



                                    <td>

                                        {
                                            new Date(member.expiryDate)
                                            .toLocaleDateString()
                                        }

                                    </td>




                                    <td>

                                        {
                                            status === "Expired"

                                            ?

                                            <span className="status-expired">
                                                Expired
                                            </span>

                                            :

                                            <span className="status-active">
                                                Active
                                            </span>

                                        }

                                    </td>




                                    <td>

                                        <div className="table-actions">


                                            <button

                                                className="edit-btn"

                                                onClick={() => onEdit(member)}

                                            >

                                                Edit

                                            </button>





                                            <button

                                                className="delete-btn"

                                                onClick={() => {

                                                    const confirmDelete =
                                                    window.confirm(
                                                        `Are you sure you want to delete ${member.name}?`
                                                    );


                                                    if(confirmDelete){

                                                        onDelete(member._id);

                                                    }

                                                }}

                                            >

                                                Delete

                                            </button>


                                        </div>


                                    </td>



                                </tr>

                            );

                        })

                    }


                </tbody>


            </table>


        </div>

    );

}


export default MembersTable;