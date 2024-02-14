// // jwt middle is router specific, so dont need give pfServer .use ("jwtrouter")
// const jwt=require('jsonwebtoken')

// const jwtMiddleware = (req,res,next)=>{
// console.log("Inside Jwt Middleware");
// //Token verification
// //get token from req Header
// const token = req.headers['authorization'] .slice(7) //token is in the request header in the key name authorization in AddProject file
// console.log(token);

// //verify using verify method

// try{
//     const tokenVerification=jwt.verify(token,"superkey2024")

// }
// catch(err){
//  res.status(401).json("Authorization failed ..please login Again..")
//  console.log(tokenVerification);
//  req.payload=tokenVerification.userId
// }

// next()
// }
// module.exports=jwtMiddleware
const jwt =require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwt middleware");
    //token verification
    //get the token from req header

    const token=req.headers['authorization'].slice(7)
    console.log(token);
    //verify the token

    try{
        const tokenVerification=jwt.verify(token,"superkey2024")
        console.log(tokenVerification);
        req.payload=tokenVerification.userId
        next()

    }
    catch(err){
        res.status(401).json("Authorization failed! Please login again!")
    }

   
}

module.exports=jwtMiddleware