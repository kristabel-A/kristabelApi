const express = require('express')
app = express()

const fs = require('fs').promises

const bcrypt = require('bcryptjs')

const path = require('path')

app.use(express.json())

//TASK -> make them Dynamic
// --Create promise for 
// readPromiseFile

// app.post("/readPromiseFile", (req,res)=>{
//     fs.readFile("uploads/output.txt","utf8").then((data)=>{
//         res.status(200).json({message:"successful", data})
//     }).catch((error)=>{
//         res.status(500).json({message:"An error occured", errMsg:error}) //500-int server error, 400

//     })//the then has callback with 1 param
// })

app.post("/readPromiseFile", async(req,res)=>{
    const {fileName} = req.body
    await fs.readFile(`uploads/${fileName}.txt`,"utf8").then((data)=>{
        console.log(fileName)
        res.status(200).json({message:"successful", data})
    }).catch((error)=>{
        res.status(500).json({message:"An error occured", errMsg:error}) //500-int server error, 400

    })//the then has callback with 1 param
})
    

    
app.post("/appendPromiseFile", (req,res) =>{
    const {fileName} = req.body
    fs.appendFile(`uploads/${fileName}.txt`, "\nThis is a new entry").then((data)=>{
        res.status(200).json({message:"successful", data})  
    }).catch((error)=>{
        res.status(500).json({message:"An error occured", errMsg:error})   
    })
})
// deletePromiseFile

app.post("/deletePromiseFile", (req,res)=>{
    const {fileName} = req.body
    fs.unlink(`uploads/${fileName}.txt`).then((data)=>{
        res.status(200).json({message:"successfully deleted the file", data})
    }).catch((error)=>{
        res.status(500).json({message:"An error occured while deleting the file", errMsg:error}) //500-int server error, 400
    })//the then has callback with 1 param
})

// checkIfFileExists
app.post("/checkIfFileExists", async(req,res) =>{
    const {fileName} = req.body
    try{
    await fs.access(`uploads/${fileName}.txt`).then((data)=>{
        res.status(200).json({message:"successful", data})
    }).catch((error)=>{
        res.status(500).json({message:"An error occured", errMsg:error}) //500-int server error, 400
    })//the then has callback with 1 param
    }
    catch(err){
        res.status(404).json({message:"An error occured, file not found"})
    }
})

app.post("/createDirectory", async(req,res)=>{
    try{
   await fs.mkdir("photos", (err)=>{  //path where the directory would be made, calll back func
        if (err){
            console.log("An error occured when creating directory")
           return res.status(500).json({message:"An error occured, file not found"})  ///return can be here or underneath   
        }
    })
    return res.status(200).json({message:"Directory created successfully"})
    }
    catch(err){
        console.log(err)
    }
})

//making path dynamic to different servers ready for deployment.. read the path directory of the server and any system and get absolute path
//for the system
//more professionally, use path lib, then join
app.get("/paths",(req,res)=>{
    const filePath = path.join(__dirname, "package.json")
    res.status(200).json({data:filePath})
    //console.log(__dirname) //will give abs path to index .js __dirname(absolute) , __fileName
})
// const PORT = 8000
// app.listen(PORT,()=>{
//     console.log(`server running on port http://localhost:${PORT}`)
// })

module.exports = app;