// /getUsers -- should return a json array of users. add a property message that says  retrieved successfully
// Veetech Programming

// /totalOrder -- should return an array of cart that has name,price,and qty. so this endpoint should return the total amount (price * qty)
// your server should run on port 8000.

const express = require('express') //module that returns a class
const app = express()  //initializing the class ,. it has a function called json on  line 10

const bcrypt = require('bcryptjs')

const fs = require('fs').promises



const {ValidateUser, ValidateProducts} = require('../utils/validator')
const { error } = require('console')

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
    //console.log(salt)
    const hashedPassword = await bcrypt.hash(password,salt) //what we use when saving. can't be decrypted
   // console.log(hashedPassword) -helped us debug to see where error 
    const userData = {
        firstName,
        lastName,
        email, 
        password,
        hashedPassword
     }
    const result = ValidateUser(userData)
    console.log(result
    )
     if(result !== true){return res.status(404).json({error:result})}
        return res.status(201).json({message:"User Created Successfully", status:201,data:userData}) // 200 can be used aswell  
}) //create user details and save in database. payload. req is used to collect payload from users. normal or destructuring method

app.post("/createProducts",(req,res) =>{
    const {id,name,qty} = req.body
    const productData = {
        id,
        name,
        qty
    }

    const productResult = ValidateProducts(productData)
    console.log(productResult)
    if(productResult !==true){return res.status(404).json({error:productResult})}
        return res.status(200).json({message:"Successfully retrieved", data:productData})

})

app.get("/readFiles", (req,res)=>{
    const {fileName}=req.body //collecting params from payload
    fs.readFile(`uploads/${fileName}.txt`,"utf8",(error, data)=>{ //it's a function that takes 3 params. dynmically reading a file 
        if (error){
            console.log(`"An error occurred" ${error}`)
            return
        }
        console.log(`"file content:" ${data}`)
    })
    res.status(200).json({message:"Data retrieved successfully"})
}
)

//req- asking, res-> sent back 
app.get("/getDetails", (req,res)=>{
    fs.readFile("uploads/outputs.txt","utf8",(error,data)=>{
        if (error){
            console.log(`"There was an" ${error}`)
            return
        }
        console.log(`"file content:" ${data}`)
    })
    res.status(200).json({message:"Ran Successfully"}) //can add data if we want it as part of what will be sent to user 
})
//nodejs backend service which is the central service/delivery point
//user is asked to create or select a file to be uploaded, which uploaded to the upload folder in teh back end. saved as users unique id.ext file
//Then we'll read the file and ...
//Payload is a parameter from api.. that is passing/inputing to parameter
//fs module file and directory system of any computer(including computers over the internet) 
// can be done synchronously and asynchronous;y-non blocking//
// two formats needed emcoding format-utf 8 and filename

app.post("/createFiles",(req,res)=>{
    const {fileName, fileContent} = req.body
    fs.writeFile(`uploads/${fileName}.txt`, fileContent, (error)=>{    //two parameters, directory uploading to and content
        if (error){
            res.status(500).json({message:error})
        return //stops execution of the code
        }
    })
    res.status(200).json({message:"File uploaded successully"})
})

//app http verb then context, path going to and the callback which takes(req-collect data from payload, res is used to output the endpoint)
//uploads directory, we want the sure to pass the file name and content then we 
//collecting two parameters from payload
//writeFile creates file if unavailbel but not good practice
//we neeed to first check if file exists before carrying out an operation

//READING FILES IN PROMISE(just added .promise to the fs)-> HAS TO HAVE THEN AND CATCH(If there's an error catch). same as write file
//assynchronous program. given task - if you are able to do the task, bring report(then), else you didnt(tell me why-catch)
//try and except-> do this task if you encounter an error continue other tasks but tell me why the task that failed wasn't completed. 

app.post("/readPromiseFile", (req,res)=>{
    fs.readFile("uploads/output.txt","utf8").then((data)=>{
        res.status(200).json({message:"successful", data})
    }).catch((error)=>{
        res.status(500).json({message:"An error occured", errMsg:error}) //500-int server error, 400

    })//the then has callback with 1 param
})

//append file(add to a file. not overwriting or removing) -> unlike write file, it doesn't overwrite what's in the file
//replace utf8 with what you want to add , use new line
app.post("/appendPromiseFile", (req,res)=>{
    fs.appendFile("uploads/outputs.txt","\nWeldon Mr Victor!").then((data)=>{
        res.status(200).json({message:"successfully appended the file", data})
    }).catch((error)=>{
        res.status(500).json({message:"An error occured while appending the file", errMsg:error}) //500-int server error, 400

    })//the then has callback with 1 param
})

//fs.unlink Deletign file, takes 1 [param]
app.post("/deletePromiseFile", (req,res)=>{
    fs.unlink("uploads/outputs.txt").then((data)=>{
        res.status(200).json({message:"successfully deleted the file", data})
    }).catch((error)=>{
        res.status(500).json({message:"An error occured while deleting the file", errMsg:error}) //500-int server error, 400
    })//the then has callback with 1 param
})

//checking if file exits, this should have try and catch
app.post("/checkIfFileExists", async(req,res)=>{
    try{
        await fs.access("uploads/outputs.txt") //if this file doesn't exist this lien would break and enter catch
        fs.writeFile("uploads/outputs.txt","Hello we have just written a new file").then((data)=>{
            res.status(200).json({message:"successful", data})
        }).catch((error)=>{
            res.status(500).json({message:"An error occured", errMsg:error}) //500-int server error, 400
    
        })//the then has callback with 1 param
    }
    catch(err){
        res.status(404).json({message:"An error occured, file not found"})
    }
})

//assignment, payload should be the filename of all we've done today
const PORT = 8000

//() is a callback , if we remove it it'll work but we won't be able to return con.log  
app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})

//http://localhost:8000/createUser
 module.exports = app;

