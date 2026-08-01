import { useEffect, useState } from "react";
import axios from "axios";
import "./Payments.css";


function Payments() {


    const [payments, setPayments] = useState([]);

    const [revenue, setRevenue] = useState(0);



    const user = JSON.parse(
        localStorage.getItem("user")
    );



    const plan = JSON.parse(
        localStorage.getItem("selectedPlan")
    );





    const fetchPayments = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5001/api/payments"
            );


            setPayments(res.data);


        } catch(error) {

            console.log(error);

        }

    };





    const fetchRevenue = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5001/api/payments/revenue"
            );


            setRevenue(res.data.revenue);


        } catch(error) {

            console.log(error);

        }

    };





    useEffect(()=>{


        if(user?.role === "ADMIN") {

            fetchPayments();

            fetchRevenue();

        }


    },[]);








    const deletePayment = async(id)=>{


        try {


            await axios.delete(

                `http://localhost:5001/api/payments/${id}`

            );


            fetchPayments();

            fetchRevenue();



        } catch(error) {


            console.log(error);


        }


    };








    const proceedPayment = async()=>{


        if(!plan){

            alert(
                "Please select a plan first"
            );

            return;

        }





        try {


            const paymentData = {


                memberId: user._id,


                memberName: user.name,


                // FIXED HERE
                plan: plan.duration || plan.name,


                amount: plan.price,


                paymentMethod: "UPI",


                status: "Paid"


            };





            console.log(
                "Sending Payment:",
                paymentData
            );





            await axios.post(

                "http://localhost:5001/api/payments",

                paymentData

            );





            alert(
                "Payment successful 🎉"
            );





            localStorage.removeItem(
                "selectedPlan"
            );





            window.location.reload();





        } catch(error) {


            console.log(

                "Payment error:",

                error.response?.data || error.message

            );



            alert(
                "Payment failed"
            );


        }


    };









    // ================= ADMIN =================


    if(user?.role === "ADMIN"){


        return (

            <div className="payments-page">


                <h1>
                    💳 Payments Management
                </h1>





                <div className="payment-cards">


                    <div className="payment-card">

                        <h3>
                            Total Revenue
                        </h3>


                        <h2>
                            ₹{revenue}
                        </h2>


                    </div>





                    <div className="payment-card">


                        <h3>
                            Total Payments
                        </h3>


                        <h2>
                            {payments.length}
                        </h2>


                    </div>





                    <div className="payment-card">


                        <h3>
                            Paid Payments
                        </h3>


                        <h2>

                            {
                                payments.filter(
                                    p=>p.status==="Paid"
                                ).length
                            }

                        </h2>


                    </div>


                </div>






                <div className="payment-table-box">


                    <table>


                        <thead>

                            <tr>

                                <th>
                                    Member
                                </th>


                                <th>
                                    Plan
                                </th>


                                <th>
                                    Amount
                                </th>


                                <th>
                                    Method
                                </th>


                                <th>
                                    Status
                                </th>


                                <th>
                                    Action
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                        {

                            payments.map((payment)=>(


                                <tr key={payment._id}>


                                    <td>

                                        {
                                            payment.memberId?.name ||
                                            payment.memberName
                                        }

                                    </td>



                                    <td>
                                        {payment.plan}
                                    </td>



                                    <td>
                                        ₹{payment.amount}
                                    </td>



                                    <td>
                                        {payment.paymentMethod}
                                    </td>




                                    <td>

                                        <span className="paid">

                                            {payment.status}

                                        </span>

                                    </td>




                                    <td>


                                        <button

                                            className="delete-btn"

                                            onClick={()=>
                                                deletePayment(
                                                    payment._id
                                                )
                                            }

                                        >

                                            Delete

                                        </button>


                                    </td>



                                </tr>


                            ))

                        }



                        </tbody>


                    </table>


                </div>



            </div>


        );


    }









    // ================= MEMBER =================



    return (

        <div className="payments-page">


            <h1>
                💳 Payment
            </h1>




            {

                plan ?



                <div className="member-payment-card">



                    <h2>

                        {plan.duration || plan.name}

                    </h2>





                    <h1>

                        ₹{plan.price}

                    </h1>





                    <button

                        onClick={proceedPayment}

                    >

                        Proceed to Payment


                    </button>



                </div>





                :



                <p>

                    No plan selected.

                </p>



            }



        </div>


    );


}


export default Payments;