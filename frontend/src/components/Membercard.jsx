import React from "react";
import "./MemberCard.css";


function MemberCard({ member, onEdit, onDelete }) {


    const today = new Date();

    const expiry = new Date(member.expiryDate);


    const daysRemaining = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
    );


    const isExpired = daysRemaining <= 0;



    const formattedStartDate = new Date(member.startDate)
        .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });



    const formattedExpiryDate = expiry
        .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });



    return (

        <div className={`member-card ${isExpired ? "expired" : ""}`}>


            <div className="card-header">


                <div className="profile-circle">

                    {member.name.charAt(0).toUpperCase()}

                </div>



                <div>

                    <h2>
                        {member.name}
                    </h2>


                    <span className="plan">

                        {member.membershipType}

                    </span>


                </div>


            </div>





            <div className="member-details">


                <div>

                    <p>📅 Joined</p>

                    <strong>
                        {formattedStartDate}
                    </strong>

                </div>



                <div>

                    <p>⏳ Expiry</p>

                    <strong>
                        {formattedExpiryDate}
                    </strong>

                </div>


            </div>





            <div className="status-section">


                <span className={`status ${isExpired ? "red" : "green"}`}>

                    {isExpired ? "Expired" : "Active"}

                </span>



                <h3>

                    {
                        isExpired
                        ? "Membership Expired"
                        : `${daysRemaining} Days Left`
                    }

                </h3>


            </div>





            <div className="card-actions">


                <button
                    className="edit-btn"
                    onClick={() => onEdit(member)}
                >

                    Edit

                </button>




                <button
                    className="delete-btn"
                    onClick={() => {

                        const confirmDelete = window.confirm(
                            `Are you sure you want to delete ${member.name}?`
                        );


                        if(confirmDelete){

                            onDelete(member._id);

                        }

                    }}
                >

                    Delete

                </button>

<button
    className="renew-btn"
    onClick={() => {

        const confirmRenew = window.confirm(
            `Renew membership for ${member.name}?`
        );


        if(confirmRenew){

            const newExpiry = new Date(member.expiryDate);


            newExpiry.setMonth(
                newExpiry.getMonth() + 1
            );


            const formattedNewExpiry =
                newExpiry.toISOString().split("T")[0];


            onEdit({
                ...member,
                expiryDate: formattedNewExpiry
            });

        }

    }}
>

    Renew Membership

</button>


       
            </div>



        </div>

    );

}


export default MemberCard;