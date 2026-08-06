import { useEffect, useState } from "react";
import axios from "axios";
import "./MemberTrainers.css";

function MemberTrainers() {

    const [trainers, setTrainers] = useState([]);

    useEffect(() => {

        const fetchTrainers = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5001/api/trainers"
                );

                setTrainers(res.data);

            } catch (error) {
                console.log("Trainer fetch error:", error);
            }
        };

        fetchTrainers();

    }, []);


    return (
        <div className="trainers-section">

            <h2>Your Trainers</h2>

            <div className="trainer-grid">

                {trainers.length === 0 ? (

                    <p>No trainers available</p>

                ) : (

                    trainers.map((trainer) => (

                        <div className="trainer-card" key={trainer._id}>

                            <h3>{trainer.name}</h3>

                            <p>📞 {trainer.phone}</p>

                            <p>✉️ {trainer.email}</p>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default MemberTrainers;