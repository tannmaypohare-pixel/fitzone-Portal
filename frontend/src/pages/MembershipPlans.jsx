import "./MembershipPlans.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function MembershipPlans() {


    const navigate = useNavigate();


    const [plans, setPlans] = useState([]);

    const [editPlan, setEditPlan] = useState(null);



    useEffect(()=>{

        fetchPlans();

    },[]);



    const fetchPlans = async()=>{

        try{

            const response = await axios.get(
                "http://localhost:5001/api/plans"
            );


            setPlans(response.data);


        }catch(error){

            console.log("Error fetching plans:", error);

        }

    };





    const handleDeletePlan = async(id)=>{


        try{


            await axios.delete(
                `http://localhost:5001/api/plans/${id}`
            );


            fetchPlans();


        }catch(error){


            console.log("Delete error:", error);


        }


    };





    const handleUpdatePlan = async()=>{


        try{


            await axios.put(

                `http://localhost:5001/api/plans/${editPlan._id}`,

                editPlan

            );


            setEditPlan(null);

            fetchPlans();


        }catch(error){


            console.log("Update error:", error);


        }


    };





    // FIXED SELECT PLAN FUNCTION

    const handleSelectPlan = (plan)=>{


        const selectedPlan = {


            _id: plan._id,


            name: plan.name || plan.duration,


            duration: plan.duration || plan.name,


            price: plan.price,


            description: plan.description || "",


            status: plan.status


        };



        console.log(
            "Selected Plan:",
            selectedPlan
        );



        localStorage.setItem(

            "selectedPlan",

            JSON.stringify(selectedPlan)

        );



        navigate("/payments");


    };





    return (

        <div className="plans-container">


            <div className="plans-header">


                <div className="plans-heading-wrap">


                    <span className="plans-badge">
                        GYM MEMBERSHIP
                    </span>


                    <h1 className="plans-title">
                        💪 Membership Plans
                    </h1>


                    <p className="plans-subtitle">
                        Choose the best membership plan for your fitness journey
                    </p>


                    <span className="plans-underline"></span>


                </div>


            </div>





            <div className="plans-grid">


                {
                    plans.map((plan)=>(

                        <div
                            className="plan-card"
                            key={plan._id}
                        >


                            <h2>
                                {plan.name || plan.duration}
                            </h2>


                            <h3>
                                ₹{plan.price}
                            </h3>


                            <p>
                                {plan.duration}
                            </p>



                            {
                                plan.description && (

                                    <p>
                                        {plan.description}
                                    </p>

                                )
                            }




                            <div className="plan-buttons">


                                <button

                                    className="select-plan-btn"

                                    onClick={()=>handleSelectPlan(plan)}

                                >

                                    Select Plan

                                </button>




                                <button

                                    className="edit-plan-btn"

                                    onClick={()=>setEditPlan(plan)}

                                >

                                    Edit

                                </button>





                                <button

                                    className="delete-plan-btn"

                                    onClick={()=>handleDeletePlan(plan._id)}

                                >

                                    Delete

                                </button>


                            </div>



                        </div>

                    ))
                }


            </div>





            {
                editPlan && (

                    <div className="edit-box">


                        <h2>
                            Edit Plan
                        </h2>



                        <input

                            value={editPlan.name || ""}

                            onChange={(e)=>
                                setEditPlan({

                                    ...editPlan,

                                    name:e.target.value

                                })
                            }

                        />



                        <input

                            value={editPlan.duration || ""}

                            onChange={(e)=>
                                setEditPlan({

                                    ...editPlan,

                                    duration:e.target.value

                                })
                            }

                        />



                        <input

                            value={editPlan.price || ""}

                            onChange={(e)=>
                                setEditPlan({

                                    ...editPlan,

                                    price:e.target.value

                                })
                            }

                        />



                        <input

                            value={editPlan.description || ""}

                            onChange={(e)=>
                                setEditPlan({

                                    ...editPlan,

                                    description:e.target.value

                                })
                            }

                        />





                        <button

                            onClick={handleUpdatePlan}

                        >

                            Update

                        </button>



                        <button

                            onClick={()=>setEditPlan(null)}

                        >

                            Cancel

                        </button>



                    </div>

                )
            }



        </div>

    );

}


export default MembershipPlans;