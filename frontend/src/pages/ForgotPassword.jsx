import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");



  const handleSubmit = async () => {

    try {

      const response = await fetch(
        "http://localhost:5001/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email
          })

        }
      );


      const data = await response.json();

      setMessage(data.message);


    } catch(error) {

      setMessage("Something went wrong");

    }

  };



  return (

    <div className="forgot-page">

      <div className="forgot-card">

        <h1>
          Forgot Password?
        </h1>

        <p>
          Enter your admin email to reset your password.
        </p>


        <input

          type="email"

          placeholder="Admin Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

        />


        <button onClick={handleSubmit}>

          Send Reset Link

        </button>


        <p>
          {message}
        </p>


      </div>

    </div>

  );

}


export default ForgotPassword;