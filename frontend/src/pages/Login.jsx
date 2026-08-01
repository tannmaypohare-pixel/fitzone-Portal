import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:5001/api/auth/login",
                {
                    email,
                    password
                }
            );


            const { token, user } = response.data;


            localStorage.setItem("token", token);

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
            else if(user.role === "MEMBER") {

                navigate("/member-dashboard");

            }



        } catch(error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
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
            else if(user.role === "MEMBER") {

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


                <div className="login-glow login-glow-1"></div>

                <div className="login-glow login-glow-2"></div>



                <div className="login-card">


                    <div className="login-form-inner">


                        <div className="wordmark">

                            <h1>
                                FitZone
                            </h1>

                            <div className="wordmark-underline"></div>

                        </div>


                        <p className="subtitle">
                            Gym Management Portal
                        </p>




                        <form onSubmit={handleLogin}>


                            <div className="field">

                                <input
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
                                />

                                <label>Email</label>

                                <div className="field-line"></div>

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


                                <label>Password</label>


                                <button
                                    type="button"
                                    className="toggle-visibility"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >

                                    {
                                        showPassword
                                        ? "Hide"
                                        : "Show"
                                    }

                                </button>


                                <div className="field-line"></div>


                            </div>




                            <div className="form-meta">


                                <label className="remember-me">

                                    <input type="checkbox"/>

                                    Remember me

                                </label>



                                <Link
                                    to="/forgot-password"
                                    className="forgot-link"
                                >

                                    Forgot password?

                                </Link>


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
                                    loading &&
                                    <span className="spinner"></span>
                                }

                                {
                                    loading
                                    ? "Logging in..."
                                    : "Login"
                                }


                            </button>


                        </form>




                        <div className="divider">
                            or continue with
                        </div>



                        <div className="social-row">


                            <GoogleLogin

                                onSuccess={handleGoogleSuccess}

                                onError={() => {
                                    setError("Google Sign-In failed");
                                }}

                            />



                            

                        </div>





                        <p className="footer-note">

                            Don't have an account?{" "}

                            <Link to="/register">
                                Create one
                            </Link>

                        </p>



                    </div>


                </div>


            </div>



            <aside className="showcase-panel">

                <div className="showcase-grid"></div>

                <div>

                    <div className="showcase-eyebrow">
                        <span className="pulse-dot"></span>
                        Live gym network
                    </div>


                    <h2 className="showcase-headline">
                        Train smarter with{" "}
                        <em>real-time</em> member insights
                    </h2>


                    <p className="showcase-copy">
                        Track attendance, memberships, and performance
                        for every member from a single, secure dashboard
                        built for modern gyms.
                    </p>


                    <div className="illustration-stage">

                        <div className="illustration-glow"></div>

                        <div className="illustration-ring"></div>

                        <svg
                            className="dumbbell-svg"
                            viewBox="0 0 200 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="10" y="26" width="18" height="28" rx="6" fill="#a78bfa" />
                            <rect x="0" y="20" width="10" height="40" rx="4" fill="#8b5cf6" />
                            <rect x="172" y="26" width="18" height="28" rx="6" fill="#60a5fa" />
                            <rect x="190" y="20" width="10" height="40" rx="4" fill="#3b82f6" />
                            <rect x="28" y="36" width="144" height="8" rx="4" fill="#c4b5fd" />
                        </svg>

                    </div>


                    <p className="illustration-caption">
                        Trusted by strength &amp; conditioning coaches
                    </p>


                </div>



                <div className="showcase-quote">

                    "FitZone cut our front-desk check-in time in half
                    and gave our coaches visibility they never had before."

                    <strong>
                        — Operations Lead, FitZone Partner Gym
                    </strong>

                </div>


            </aside>


        </div>

    );

}


export default Login;