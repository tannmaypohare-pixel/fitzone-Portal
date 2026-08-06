import { useEffect, useState } from "react";
import API from "../services/api";
import "./MemberTrainers.css";


function MemberTrainers() {

    const [trainers, setTrainers] = useState([]);

useEffect(() => {

    const fetchTrainers = async () => {

        try {

            const res = await API.get("/trainers");

            setTrainers(res.data);

        } catch (error) {

            console.log(
                "Trainer fetch error:",
                error
            );

        }

    };


    fetchTrainers();

}, []);



    return (

        <section className="member-trainers">


            <div className="trainer-section-header">

                <h2>
                    My Trainer 🏋️
                </h2>

                <p>
                    Your assigned FitZone trainer
                </p>

            </div>



            <div className="member-trainer-grid">


                {
                    trainers.length === 0 ? (

                        <div className="no-trainers">

                            No trainer assigned yet

                        </div>


                    ) : (

                        trainers.map((trainer) => (

                            <div
                                className="member-trainer-card"
                                key={trainer._id}
                            >


                                <div className="member-trainer-avatar">

                                    {trainer.name?.charAt(0)}

                                </div>



                                <h3>
                                    {trainer.name}
                                </h3>



                                <p>
                                    🏋️ {trainer.specialization || "Fitness Trainer"}
                                </p>



                                <p>
                                    ⭐ {trainer.experience || 0} Years Experience
                                </p>



                                <p>
                                    📞 {trainer.phone || "Not available"}
                                </p>


                            </div>

                        ))

                    )
                }


            </div>


        </section>

    );

}


export default MemberTrainers;