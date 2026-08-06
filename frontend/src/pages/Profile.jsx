import { useState } from "react";
import "./Profile.css";


function Profile() {


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    return (

        <div className="profile-page">


            <h1>
                👤 My Profile
            </h1>



            <div className="profile-card">


                <div className="profile-avatar-large">

                    {user?.name?.charAt(0) || "M"}

                </div>




                <div className="profile-details">


                    <h2>
                        {user?.name || "Member"}
                    </h2>



                    <p>
                        📧 {user?.email || "No email"}
                    </p>



                    <p>
                        🎯 Role: {user?.role || "MEMBER"}
                    </p>


                </div>


            </div>



        </div>

    );

}


export default Profile;