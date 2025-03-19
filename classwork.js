// /getUsers -- should return a json array of users. add a property message that says  retrieved successfully
// Veetech Programming

// /totalOrder -- should return an array of cart that has name,price,and qty. so this endpoint should return the total amount (price * qty)
// your server should run on port 8000.

const express = require('express') //module that returns a class
const app = express()  //initializing the class ,. it has a function called json on  line 10

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



const PORT = 8000

//() is a callback , if we remove it it'll work but we won't be able to return con.log  
app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})
