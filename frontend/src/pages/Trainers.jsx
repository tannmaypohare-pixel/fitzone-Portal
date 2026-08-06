import { useState, useEffect } from "react";
import axios from "axios";
import "./Trainers.css";


function Trainers() {


  const [trainers, setTrainers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);


  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: ""
  });



  // GET TRAINERS

  const fetchTrainers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5001/api/trainers"
      );

      setTrainers(res.data);


    } catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchTrainers();

  },[]);





  // ADD / UPDATE TRAINER

  const saveTrainer = async()=>{


    if(!newTrainer.name){

      alert("Please enter trainer name");
      return;

    }



    try{


      if(editingId){


        await axios.put(

          `http://localhost:5001/api/trainers/${editingId}`,

          newTrainer

        );


      }
      else{


        await axios.post(

          "http://localhost:5001/api/trainers",

          {
            ...newTrainer,
            role:"TRAINER"
          }

        );


      }



      fetchTrainers();



      setNewTrainer({

        name:"",
        email:"",
        phone:"",
        specialization:"",
        experience:""

      });



      setEditingId(null);

      setShowForm(false);



    }catch(error){

      console.log(error);

    }


  };





  // EDIT BUTTON


  const editTrainer=(trainer)=>{


    setNewTrainer({

      name:trainer.name || "",
      email:trainer.email || "",
      phone:trainer.phone || "",
      specialization:trainer.specialization || "",
      experience:trainer.experience || ""

    });


    setEditingId(trainer._id);

    setShowForm(true);


  };






  // DELETE TRAINER


  const deleteTrainer=async(id)=>{


    try{


      await axios.delete(

        `http://localhost:5001/api/trainers/${id}`

      );


      fetchTrainers();



    }catch(error){

      console.log(error);

    }


  };






return (

<div className="trainers-page">



<div className="trainer-header">


<div className="trainer-title">

<h1>
FitZone Trainers
</h1>

<p>
Manage professional trainers and their expertise
</p>

</div>



<button
className="add-trainer-btn"
onClick={()=>setShowForm(!showForm)}
>

＋ Add Trainer

</button>


</div>





{
showForm &&

<div className="trainer-form-card">


<h2>
{
editingId ? "Edit Trainer" : "Add New Trainer"
}
</h2>



<div className="trainer-inputs">


<input

placeholder="Trainer Name"

value={newTrainer.name}

onChange={(e)=>
setNewTrainer({
...newTrainer,
name:e.target.value
})
}

/>


<input

placeholder="Email"

value={newTrainer.email}

onChange={(e)=>
setNewTrainer({
...newTrainer,
email:e.target.value
})
}

/>


<input

placeholder="Phone"

value={newTrainer.phone}

onChange={(e)=>
setNewTrainer({
...newTrainer,
phone:e.target.value
})
}

/>


<input

placeholder="Specialization"

value={newTrainer.specialization}

onChange={(e)=>
setNewTrainer({
...newTrainer,
specialization:e.target.value
})
}

/>


<input

placeholder="Experience"

value={newTrainer.experience}

onChange={(e)=>
setNewTrainer({
...newTrainer,
experience:e.target.value
})
}

/>


</div>



<button

className="save-trainer-btn"

onClick={saveTrainer}

>

{
editingId ? "Update Trainer" : "Save Trainer"
}

</button>


</div>

}







<div className="trainer-table-card">


<table>


<thead>

<tr>

<th>Trainer</th>

<th>Specialization</th>

<th>Experience</th>

<th>Actions</th>

</tr>

</thead>



<tbody>


{

trainers.length===0 ?


<tr>

<td 
colSpan="4"
className="empty-trainer"
>

🏋️ No trainers added yet

</td>

</tr>



:

trainers.map((trainer)=>(


<tr key={trainer._id}>


<td>


<div className="trainer-profile">


<div className="trainer-avatar">

{
trainer.name?.charAt(0)
}

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



<td>


<button

className="edit-btn"

onClick={()=>editTrainer(trainer)}

>

Edit

</button>



<button

className="delete-btn"

onClick={()=>deleteTrainer(trainer._id)}

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


export default Trainers;