import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";


function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();


    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");



    const handleReset = async (e) => {

        e.preventDefault();


        try {

            const response = await fetch(
                `http://localhost:5001/api/auth/reset-password/${token}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        password
                    })

                }
            );


            const data = await response.json();


            setMessage(data.message);


            if(response.ok){

                setTimeout(() => {

                    navigate("/");

                },1500);

            }


        } catch(error){

            setMessage("Something went wrong");

        }

    };



    return (

        <div className="forgot-container">

            <h2>
                Reset Password 🔐
            </h2>


            <form onSubmit={handleReset}>


                <input

                    type="password"

                    placeholder="Enter new password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    required

                />


                <button type="submit">

                    Reset Password

                </button>


            </form>


            <p>
                {message}
            </p>


        </div>

    );

}


export default ResetPassword;