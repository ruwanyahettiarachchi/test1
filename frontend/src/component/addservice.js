import { useState } from "react";
import axios from "axios";
import './add service.css'


function AddService(){
    const [order,setorder]=useState({
        name:"",
        email:"",
        contact:"",
        doctor:"",
        date:"",
        time:""
        
       
    })

    const handleonchange=(e)=>{
        const {value,name}=e.target
        setorder((preve)=>{
               return{
                ...preve,
                [name]:value
               }
          })
       
        
    }
    
    const handlesubmit=async(e)=>{
     
       e.preventDefault()
       const data=await axios.post("http://localhost:8080/create",order)
          console.log(data)
          alert("your details added now!")
         
     
    }


    return(
        <div className="add-service">
    
<h2>Channelling Form</h2>
    <form onSubmit={handlesubmit}>
    <lable>Patient Name:</lable>
    <input type="text" id="name" name="name" onChange={handleonchange}/><br></br>
    <lable>Email:</lable>
    <input type="text" id="email" name="email" onChange={handleonchange}/><br></br>
    <lable>Contact :</lable>
    <input type="text" id="contact" name="contact" onChange={handleonchange}/><br></br> 
    <lable>Doctor:</lable>
    <select  id="doctor" name="doctor" onChange={handleonchange}>
        <option>Doctor1</option>
        <option>Doctor2</option>
        <option>Doctor3</option>
    </select>
    <lable>Date:</lable>
    <input type="date" id="date" name="date" onChange={handleonchange}/><br></br>
    <lable>Time:</lable>
    <input type="time" id="time" name="time" onChange={handleonchange}/><br></br>
     <br></br> <br></br> <br></br> 
  


    <button>Order Place</button>
    </form><br></br> 
   
        </div>
    )
}
export default AddService;