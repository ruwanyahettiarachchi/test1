const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")


const app=express()

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT||8080




const receptionistschema=mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    doctor:String,
    date:String,
    time:String

    

},{
    timestamps:true

})

const receptionistmodel=mongoose.model("receptionist",receptionistschema)



app.get("/",async(req,res)=>{
    const data= await receptionistmodel.find({})
  
    res.json({success:true,data:data})
})


app.post("/create",async(req,res)=>{
    const data=new receptionistmodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


app.put("/update",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await receptionistmodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




app.delete("/delete/:id",async(req,res)=>{
const id=req.params.id
const data=await receptionistmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})





app.get("/user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await receptionistmodel.findById(id);

        if (!discount) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
app.get("/count",async(req,res)=>{
    try{
        const users=await receptionistmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"distributor count successfully",data:data})
    }

})


mongoose.connect("mongodb+srv://shehan:Shehan99@cluster0.t3v3psz.mongodb.net/Distributor?retryWrites=true&w=majority")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

