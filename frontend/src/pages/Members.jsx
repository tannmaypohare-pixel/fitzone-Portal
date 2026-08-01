import Membercard from "../components/Membercard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Member.css";

import API from "../services/api";
import MembersTable from "../components/MembersTable";


function Members() {


    const [members, setMembers] = useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("all");


    const navigate = useNavigate();



    useEffect(() => {

        fetchMembers();

    }, []);



    const fetchMembers = async () => {

        try {

            const response = await API.get("/members");

            console.log("Members:", response.data);

            setMembers(response.data);

        } 
        
        catch (error) {

            console.log("Error:", error);

        }

    };




    const handleEdit = (member) => {

        navigate("/add-member", {

            state: {

                member,

            },

        });

    };




    const handleDelete = async (id) => {

        try {

            await API.delete(`/members/${id}`);


            setMembers(

                members.filter(

                    (member) => member._id !== id

                )

            );

        } 
        
        catch (error) {

            console.log(error);

        }

    };





    const filteredMembers = members.filter((member)=>{


        const matchesSearch =

            member.name
            ?.toLowerCase()
            .includes(search.toLowerCase())

            ||

            member.phone
            ?.toString()
            .includes(search)

            ||

            member.email
            ?.toLowerCase()
            .includes(search.toLowerCase());




        const expiryDate = new Date(member.expiryDate);

        const today = new Date();



        const matchesFilter =

            filter === "all"

            ||

            (filter === "active" && expiryDate > today)

            ||

            (filter === "expired" && expiryDate <= today);



        return matchesSearch && matchesFilter;


    });





    return (

        <div className="members-page">


            <div className="members-header">


                <h1>

                    FitZone Members

                </h1>



                <Link to="/add-member">


                    <button className="add-btn">

                        + Add Member

                    </button>


                </Link>


            </div>




            <div className="member-controls">


                <input

                    type="text"

                    placeholder="🔍 Search Members..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />



                <select

                    value={filter}

                    onChange={(e)=>setFilter(e.target.value)}

                >

                    <option value="all">

                        All Members

                    </option>


                    <option value="active">

                        Active Members

                    </option>


                    <option value="expired">

                        Expired Members

                    </option>


                </select>


            </div>





            <MembersTable

                members={filteredMembers}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />





            <div className="member-cards">


                {

                    filteredMembers.map((member)=>(


                        <Membercard

                            key={member._id}

                            member={member}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />


                    ))

                }


            </div>



        </div>

    );

}



export default Members;