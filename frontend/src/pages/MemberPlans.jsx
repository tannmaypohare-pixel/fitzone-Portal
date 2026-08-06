import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberPlans.css";


function MemberPlans() {

    const navigate = useNavigate();

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);



    useEffect(() => {

        const fetchPlans = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5001/api/plans"
                );

                setPlans(response.data);

            } catch (error) {

                console.log(
                    "Error fetching plans:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchPlans();

    }, []);




    const formatDuration = (duration) => {

        if (duration === "3 Month")
            return "3 Months";

        if (duration === "6 Month")
            return "6 Months";

        if (duration === "12 Month")
            return "12 Months";

        return duration;

    };




    const handleSelectPlan = (plan) => {

        setSelectedPlan(plan);

        localStorage.setItem(
            "selectedPlan",
            JSON.stringify(plan)
        );

    };




    const proceedPayment = () => {

        if (!selectedPlan) {

            alert("Please select a plan first");
            return;

        }


        navigate("/my-payments");

    };




    if (loading) {

        return (
            <div className="loading">
                Loading Plans...
            </div>
        );

    }





    return (

        <>

            <div className="bg-blob one"></div>
            <div className="bg-blob two"></div>


            <div className="member-plans-container">


                <h1>
                    Choose Your Plan
                </h1>


                <p>
                    Pick the plan that fits your fitness journey — upgrade anytime.
                </p>




                <div className="plans-grid">


                    {
                        plans.map((plan, index) => (

                            <div

                                key={plan._id}

                                className={
                                    selectedPlan?._id === plan._id
                                    ? "plan-card selected"
                                    : "plan-card"
                                }


                                onClick={() =>
                                    handleSelectPlan(plan)
                                }

                            >



                                {
                                    index === 1 && (

                                        <span className="popular-badge">
                                            Popular
                                        </span>

                                    )
                                }





                                <h2>
                                    {plan.name}
                                </h2>




                                <h3>

                                    ₹{plan.price}

                                    <span>
                                        /{formatDuration(plan.duration)}
                                    </span>

                                </h3>




                                <ul>

                                    <li>
                                        Full Gym Access
                                    </li>


                                    <li>
                                        Trainer Guidance
                                    </li>


                                    <li>
                                        Workout Plans
                                    </li>


                                    <li>
                                        Progress Tracking
                                    </li>


                                </ul>





                                <button>

                                    {
                                        selectedPlan?._id === plan._id
                                        ? "Selected ✓"
                                        : `Choose ${plan.name}`
                                    }

                                </button>



                            </div>

                        ))
                    }



                </div>





                <button

                    className="payment-btn"

                    onClick={proceedPayment}

                >

                    Continue To Payment

                </button>



            </div>


        </>

    );

}


export default MemberPlans;