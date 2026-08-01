import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");

        if(password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        if(password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }


        setLoading(true);


        try {

            const response = await axios.post(
                "http://localhost:5001/api/auth/register",
                {
                    name,
                    email,
                    phone,
                    password
                }
            );


            const { token, user } = response.data;


            localStorage.setItem(
                "token",
                token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            if(user.role === "ADMIN") {

                navigate("/dashboard");

            }
            else {

                navigate("/member-dashboard");

            }


        } catch(error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        }


        setLoading(false);

    };





    const handleGoogleSuccess = async (credentialResponse) => {

        try {

            const response = await axios.post(
                "http://localhost:5001/api/auth/google-login",
                {
                    token: credentialResponse.credential
                }
            );


            const { token, user } = response.data;


            localStorage.setItem(
                "token",
                token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            if(user.role === "ADMIN") {

                navigate("/dashboard");

            }
            else {

                navigate("/member-dashboard");

            }


        } catch(error) {

            console.log(error);

            setError("Google login failed");

        }

    };





    return (

        <div className="page-shell">

            <div className="login-container">


                <div className="login-card">

                    <div className="login-form-inner">


                        <div className="wordmark">

                            <h1>
                                FitZone
                            </h1>

                            <div className="wordmark-underline"></div>

                        </div>


                        <p className="subtitle">
                            Create your member account
                        </p>



                        <form onSubmit={handleRegister}>


                            <div className="field">

                                <input
                                    type="text"
                                    placeholder=" "
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    required
                                />

                                <label>
                                    Full name
                                </label>

                            </div>



                            <div className="field">

                                <input
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
                                />

                                <label>
                                    Email
                                </label>

                            </div>



                            <div className="field">

                                <input
                                    type="text"
                                    placeholder=" "
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                    required
                                />

                                <label>
                                    Phone
                                </label>

                            </div>




                            <div className="field">

                                <input
                                    type={
                                        showPassword
                                        ? "text"
                                        : "password"
                                    }
                                    placeholder=" "
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                />

                                <label>
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="toggle-visibility"
                                    onClick={()=>setShowPassword(!showPassword)}
                                >
                                    {
                                        showPassword
                                        ? "Hide"
                                        : "Show"
                                    }
                                </button>

                            </div>




                            <div className="field">

                                <input
                                    type={
                                        showConfirmPassword
                                        ? "text"
                                        : "password"
                                    }
                                    placeholder=" "
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                    required
                                />

                                <label>
                                    Confirm password
                                </label>


                                <button
                                    type="button"
                                    className="toggle-visibility"
                                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {
                                        showConfirmPassword
                                        ? "Hide"
                                        : "Show"
                                    }
                                </button>

                            </div>




                            {
                                error &&
                                <p className="error-text">
                                    {error}
                                </p>
                            }




                            <button
                                className="submit-btn"
                                type="submit"
                                disabled={loading}
                            >

                                {
                                    loading
                                    ? "Creating account..."
                                    : "Create account"
                                }

                            </button>


                        </form>




                        <div className="divider">
                            or sign up with
                        </div>




                        <div className="social-row">


                            <GoogleLogin

                                onSuccess={handleGoogleSuccess}

                                onError={()=>{
                                    setError("Google Sign-In failed");
                                }}

                            />


                        </div>




                        <p className="footer-note">

                            Already have an account?{" "}

                            <Link to="/login">
                                Log in
                            </Link>

                        </p>


                    </div>


                </div>


            </div>


        </div>

    );

}


export default Register;