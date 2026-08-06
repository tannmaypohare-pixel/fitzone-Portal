import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import "./AddMember.css";

function AddMember() {

    const navigate = useNavigate();
    const location = useLocation();

    const editMember = location.state?.member;

    const [member, setMember] = useState({

        name: "",
        phone: "",
        email: "",
        age: "",
        membershipType: "1 Month",
        startDate: "",
        expiryDate: ""

    });


    useEffect(() => {

        if (editMember) {

            setMember({

                ...editMember,

                membershipType:
                    editMember.membershipType === "Monthly"
                        ? "1 Month"
                        : editMember.membershipType === "Quarterly"
                            ? "3 Month"
                            : editMember.membershipType === "Yearly"
                                ? "12 Month"
                                : editMember.membershipType,


                startDate: editMember.startDate
                    ? editMember.startDate.substring(0, 10)
                    : "",


                expiryDate: editMember.expiryDate
                    ? editMember.expiryDate.substring(0, 10)
                    : ""

            });

        }

    }, [editMember]);



    const handleChange = (e) => {

        setMember({

            ...member,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            if (editMember) {


                await API.put(

                    `/members/${editMember._id}`,

                    member

                );


                alert("Member Updated Successfully");


            } else {


                await API.post(

                    "/members",

                    member

                );


                alert("Member Added Successfully");


            }



            navigate("/members");



        } catch (error) {


            console.log(error);


            alert(

                error.response?.data?.message ||

                "Failed to add member"

            );


        }

    };



    return (

        <div className="add-member-page">


            <div className="add-member-card">


                <h1 className="add-member-title">

                    {editMember ? "Edit Member" : "Add New Member"}

                </h1>


                <p className="add-member-subtitle">

                    {editMember

                        ? "Update member details"

                        : "Register a new FitZone member"

                    }

                </p>



                <form

                    className="add-member-form"

                    onSubmit={handleSubmit}

                >



                    <div className="form-group">

                        <label>Name</label>


                        <input

                            type="text"

                            name="name"

                            placeholder="Enter Name"

                            value={member.name}

                            onChange={handleChange}

                            required

                        />

                    </div>




                    <div className="form-group">

                        <label>Phone Number</label>


                        <input

                            type="text"

                            name="phone"

                            placeholder="Enter Phone Number"

                            value={member.phone}

                            onChange={handleChange}

                            required

                        />

                    </div>





                    <div className="form-group">

                        <label>Email</label>


                        <input

                            type="email"

                            name="email"

                            placeholder="Enter Email"

                            value={member.email}

                            onChange={handleChange}

                        />

                    </div>





                    <div className="form-group">

                        <label>Age</label>


                        <input

                            type="number"

                            name="age"

                            placeholder="Enter Age"

                            value={member.age}

                            onChange={handleChange}

                        />

                    </div>





                    <div className="form-group full-width">


                        <label>Membership Type</label>


                       <select
    name="membershipType"
    value={member.membershipType}
    onChange={handleChange}
>

    <option value="1 Month">
        1 Month
    </option>

    <option value="3 Month">
        3 Months
    </option>

    <option value="6 Month">
        6 Months
    </option>

    <option value="12 Month">
        12 Months
    </option>

</select>


                      


                    </div>





                    <div className="form-group">


                        <label>Joining Date</label>


                        <input

                            type="date"

                            name="startDate"

                            value={member.startDate}

                            onChange={handleChange}

                            required

                        />


                    </div>





                    <div className="form-group">


                        <label>Expiry Date</label>


                        <input

                            type="date"

                            name="expiryDate"

                            value={member.expiryDate}

                            onChange={handleChange}

                            required

                        />


                    </div>





                    <div className="form-group full-width">


                        <button

                            type="submit"

                            className="add-btn"

                        >


                            {editMember

                                ? "Update Member"

                                : "+ Add Member"

                            }


                        </button>


                    </div>



                </form>



            </div>



        </div>

    );

}


export default AddMember;