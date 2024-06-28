const mongoose = require("mongoose")


async function connectingDataBase () {
     
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("connected to the database successfully")
    })
    .catch((error)=> {
        console.log("error connecting to database : "  + error.message)
    });

};
module.exports =  connectingDataBase
