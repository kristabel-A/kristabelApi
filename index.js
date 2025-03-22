// /getUsers -- should return a json array of users. add a property message that says  retrieved successfully
// Veetech Programming

// /totalOrder -- should return an array of cart that has name,price,and qty. so this endpoint should return the total amount (price * qty)
// your server should run on port 8000.

const express = require('express') //module that returns a class
const app = express()  //initializing the class ,. it has a function called json on  line 10

const bcrypt = require('bcryptjs')

app.use(express.json())

app.get("/users", (req,res)=> {
    const users =[{
        name:"Tomi",
        occupation:"Lawyer",
        jobCode:"514"
    },
    {
        name:"Chidera",
        occupation:"Accountant",
        jobCode:"524"
    }
    ]
    return res 
        .status(200)
        .json({message:"successfully retrieved",data:users})

})

app.post("/totalOrder", (req,res)=>{
    carts=[
            {
            name:"Perfume",
            price:3,
            qty:3
            }, 
            {
            name:"Loius Vuitton",
            price:20,
            qty:5
            },
            {
            name:"Macbook M1",
            price: 10,
            qty:1
            }
        ]; 
    let totalPrice = carts.reduce((total,item)=> total+item.price * item.qty,0)
        console.log(totalPrice)
        return res
        .status(200)
        .json({message:"successfully retrieved",data:totalPrice,products:carts}) 
}          
) 

app.get("/",(req,res)=>{
    res.status(200).json({data:"done"})
    })
//illegal pafram was seeing string and an object becayse we didnt use await and async

app.post("/createUser",async(req,res)=>{
    // const firstName = req.body ---- normal way but longer lines. below is dest method
    // const lastName = req.body
    const {firstName, lastName, email, password} = req.body 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt) //what we use when saving. can't be decrypted
   // console.log(hashedPassword) -helped us debug to see where error 
    const userData = {
        firstName,
        lastName,
        email, 
        hashedPassword
     }
    if(!firstName) {
        return res.status(404).json({error:"First Name is required",status:404})
    }
    if(!lastName) {
        return res.status(404).json({error:"Last Name is required",status:404})
    }
    if(!email) {
        return res.status(404).json({error:"Email is required",status:404})
    }
    if(!password) {
        return res.status(404).json({error:"Password is required",status:404})
    }
        return res.status(201).json({message:"User Created Successfully", status:201,data:userData}) // 200 can be used aswell  
}) //create user details and save in database. payload. req is used to collect payload from users. normal or destructuring method


//const PORT = 8000

//() is a callback , if we remove it it'll work but we won't be able to return con.log  
// app.listen(PORT,()=>{
//     console.log(`server running on port http://localhost:${PORT}`)
// })

 module.exports = app;