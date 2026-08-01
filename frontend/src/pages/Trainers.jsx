import { useState } from "react";
import "./Trainers.css";

function Trainers() {

  const [trainers, setTrainers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [newTrainer, setNewTrainer] = useState({
    name: "",
    specialization: "",
    experience: ""
  });

  const deleteTrainer = (id) => {
    setTrainers(
      trainers.filter((trainer) => trainer.id !== id)
    );
  };

  const addTrainer = () => {

    if (
      !newTrainer.name ||
      !newTrainer.specialization ||
      !newTrainer.experience
    ) {
      alert("Please fill all fields.");
      return;
    }

    const trainer = {
      id: Date.now(),
      name: newTrainer.name,
      specialization: newTrainer.specialization,
      experience: newTrainer.experience
    };

    setTrainers([...trainers, trainer]);

    setNewTrainer({
      name: "",
      specialization: "",
      experience: ""
    });

    setShowForm(false);
  };

  return (

    <div className="trainers-page">

      <div className="page-header">

        <div>

          <h1>FitZone Trainers</h1>

          <p>Manage your gym trainers</p>

        </div>

        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Trainer
        </button>

      </div>

      {showForm && (

        <div className="trainer-form">

          <input
            type="text"
            placeholder="Trainer Name"
            value={newTrainer.name}
            onChange={(e) =>
              setNewTrainer({
                ...newTrainer,
                name: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Specialization"
            value={newTrainer.specialization}
            onChange={(e) =>
              setNewTrainer({
                ...newTrainer,
                specialization: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Experience"
            value={newTrainer.experience}
            onChange={(e) =>
              setNewTrainer({
                ...newTrainer,
                experience: e.target.value
              })
            }
          />

          <button
            className="save-btn"
            onClick={addTrainer}
          >
            Save Trainer
          </button>

        </div>

      )}

      <div className="trainer-table">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {trainers.length === 0 ? (

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "30px"
                  }}
                >
                  No trainers added yet.
                </td>
              </tr>

            ) : (

              trainers.map((trainer) => (

                <tr key={trainer.id}>

                  <td>{trainer.name}</td>

                  <td>{trainer.specialization}</td>

                  <td>{trainer.experience}</td>

                  <td>

                    <button className="edit-btn">
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTrainer(trainer.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Trainers;