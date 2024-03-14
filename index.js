require('dotenv').config()
const express=require('express')
const cors=require('cors')

//create a server
const CServer=express()

const router=require('./Routes/route') // for path setting
require('./DB/connection')


CServer.use(cors()) // for data sharing

CServer.use(express.json()) //parse the data before going to router since json is  unknown for node
CServer.use(router)
CServer.use('/uploads',express.static('./uploads'))

//for host
const PORT=3000
CServer.listen(PORT,()=>{
    console.log(`Server started at port ${PORT} !!!`);
})

CServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Project  started!!! Waiting for Client request...</h1>")
})