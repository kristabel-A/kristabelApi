const http = require('http') 

// http.createServer(function(req,res){
//     res.writeHead(200,{'contentType':'text/html'})
//     res.end("Hello first node js server")
// }).listen(8000)

const express = require('express') ////importing express module, before using a package you have to require it
const app = express() //defining the variable

app.use(express.json()) //express should make use of json]

// /means root directory
app.get("/", (req,res)=>{
    return res
        .status(200)
        .json({message:"Successfully started my server with express route"})
})

app.post("/user",(req, res)=>{
    const users ={ 
        name:"victor",
        occupation:"Software Engineer",
        experience:"10+ years"
    }
return res.status(200).json({message:"successfully retrieved",data:users})
})
const PORT = 4000

app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})
//app.listen(4000) //port numbers are called ppid in networking 