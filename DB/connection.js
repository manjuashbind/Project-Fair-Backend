const mongoose=require('mongoose')
const connectionstring=process.env.DATABASE
// DATABASE is where we saved connection string inside .env file

mongoose.connect(connectionstring)
.then(()=>{
    console.log('Mongodb Connection Established');
})
.catch((error)=>{
    console.log('Mongodb Connection Error');
})