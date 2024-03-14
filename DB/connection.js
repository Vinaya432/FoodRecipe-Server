const mongoose = require('mongoose')

const ConnectionString=process.env.Connection_String

mongoose.connect(ConnectionString).then(
    ()=>{
        console.log("MomgoDB Atlas Connected Sucessfully");
    }
).catch(err=>{
    console.log("MongoDB Connection Failed!!!", err);
})