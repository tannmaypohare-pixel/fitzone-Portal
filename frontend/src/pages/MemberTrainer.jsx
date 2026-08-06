import { useEffect, useState } from "react";
import API from "../services/api";
import "./Trainers.css";


function MemberTrainer() {


    const [trainers, setTrainers] = useState([]);



    useEffect(()=>{

        fetchTrainers();

    },[]);





    const fetchTrainers = async()=>{

        try{


            const res = await API.get("/trainers");


            console.log(
                "TRAINER DATA:",
                res.data
            );


            setTrainers(res.data);



        }catch(error){


            console.log(
                "Trainer fetch error:",
                error
            );


        }

    };






    return (

        <div className="trainers-page">


            <div className="trainer-header">


                <div className="trainer-title">


                    <h1>
                        My Trainer
                    </h1>


                    <p>
                        Your assigned fitness professional
                    </p>


                </div>


            </div>






            <div className="trainer-table-card">


                <table>


                    <thead>

                        <tr>

                            <th>
                                Trainer
                            </th>

                            <th>
                                Specialization
                            </th>

                            <th>
                                Experience
                            </th>


                        </tr>

                    </thead>





                    <tbody>


                    {
                        trainers.length === 0 ?


                        <tr>

                            <td colSpan="3">

                                No trainer assigned yet

                            </td>


                        </tr>



                        :



                        trainers.map((trainer)=>(


                            <tr key={trainer._id}>


                                <td>


                                    <div className="trainer-profile">


                                        <div className="trainer-avatar">

                                            {trainer.name?.charAt(0)}

                                        </div>



                                        <span>

                                            {trainer.name}

                                        </span>


                                    </div>


                                </td>




                                <td>

                                    {trainer.specialization || "-"}

                                </td>




                                <td>

                                    {trainer.experience || "-"} Years

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


export default MemberTrainer;