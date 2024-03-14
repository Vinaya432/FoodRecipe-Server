const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const admins = require('../Models/adminModel');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register= async (req,res)=>{
    const {username,email,password}=req.body
    console.log(username,email,password);
    console.log("Inside reg request");

    try{
        //check email already exists
        const existingUser = await users.findOne({email})//email should be given as key value pair ,but since kay and value have same name we have to keep single 
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User already exist!! Please Login...")

        }else{
            //add user to db
            const newUser= new users({
                username,email,password,profile:"",instagram:"",facebook:"",role:'user'
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        console.log("inside catch of usercontroller");
        res.status(401).json(err)
    }
}

//login

exports.login= async (req,res)=>{
    const {email,password,role}=req.body
    console.log(role);
    console.log("Inside login request");
    if(role=="user"){
        try{
            //check email,password  exists
            const existingUser = await users.findOne({email,password}) 
            console.log("Existing User: ",existingUser);
            if(existingUser){
                //generate jwt token for sucessful login user
                const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret)
                res.status(200).json({existingUser,token})
    
            }else{
                res.status(406).json("Invalid Email/Password")
            }
        }catch(err){
            res.status(401).json(err)
        }
    }else if(role=='admin'){
        try {
            // Check if email and password exist for admin
            const existingAdmin = await admins.findOne({ email, password });
            console.log("Existing Admin: ", existingAdmin);
            if (existingAdmin) {
                // Generate JWT token for successful login admin
                const token = jwt.sign({ adminId: existingAdmin._id }, process.env.jwt_secret);
                res.status(200).json({ existingAdmin, token });
            } else {
                res.status(406).json("Invalid Admin Email/Password");
            }
        } catch (err) {
            res.status(401).json(err);
        }

    }

   
}

// exports.login = async (req, res) => {
//     const { email, password, googleToken } = req.body;
//     console.log("Inside login request");

//     try {
//         if (googleToken) {
//             // If Google token is provided, verify it
//             const ticket = await client.verifyIdToken({
//                 idToken: googleToken,
//                 audience: process.env.GOOGLE_CLIENT_ID,
//             });

//             const payload = ticket.getPayload();
//             const { email: googleEmail } = payload;

//             // Check if the user already exists in your database
//             const existingUser = await users.findOne({ email: googleEmail });

//             if (existingUser) {
//                 // If the user exists, generate a JWT token and send it back to the client
//                 const token = jwt.sign({ userId: existingUser._id }, process.env.jwt_secret);
//                 console.log("google token",token);
//                 res.status(200).json({ existingUser, token });
//             } else {
//                 // If the user doesn't exist, you might want to handle this case accordingly
//                 res.status(404).json("User not found");
//             }
//         } else {
//             // If Google token is not provided, proceed with normal email/password login
//             const existingUser = await users.findOne({ email, password });
//             console.log("Existing User: ", existingUser);

//             if (existingUser) {
//                 // Generate jwt token for successful login user
//                 const token = jwt.sign({ userId: existingUser._id }, process.env.jwt_secret);
//                 res.status(200).json({ existingUser, token });
//             } else {
//                 res.status(406).json("Invalid Email/Password");
//             }
//         }
//     } catch (err) {
//         res.status(401).json(err);
//     }
// }



//profile updation

exports.editUser=async(req,res)=>{
    const userId=req.payload
    const {username,password,email,facebook,instagram,profile}= req.body
    const pImg= req.file?req.file.filename:profile

    try {
        const updateUser= await users.findByIdAndUpdate({_id:userId},{username,email,password,pImg,instagram,facebook},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(401).json(error)
        
    }
}
