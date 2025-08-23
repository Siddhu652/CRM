const { where } = require("sequelize");
const {user} = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signup =async (req,res,next)=>{
    try{
    const {name, email, password, phone_number} = req.body;
   
    const hashedpass = await bcrypt.hash(password, 8);

        const createuser = await user.create({
            user_name: name,
            email : email,
            password : hashedpass,
            phone_number : phone_number
        })
        res.status(201).json({
        status:"success",
        message:"user created successfully",
        data : createuser
    })
}
catch(error){
     res.status(500).json({
        status:"error",
        message:"internal server error",
        error: error
      
    })
}
}

const getusers = async (req,res) => {
    try{
        const userDetails = await user.findAll();
       res.status(200).json({
        status:"success",
        data : userDetails
    })
}
    catch(error){
     res.status(500).json({
        status:"error",
        message:"internal server error",
        error: error
      
    })
}
}

const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("id", id);

        const { name, email, password, phone_number } = req.body;

        const finduser = await user.findByPk(id);
        // console.log(finduser);

        if (!finduser) {
            return res.status(404).json({
                status: "error",
                message: "no user found"
            });
        }

        await finduser.update({ name, email, password, phone_number });

        res.status(200).json({ status: "success", message: "user updated successfully" });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "internal server error",
            error: error
        });
    }
};

const updatesinglevalue = async (req,res)=>{
    try {
          const { id } = req.params;
        // console.log("id", id);
console.log(req.body);

        const { name, phone_number } = req.body;

        const finduser = await user.findByPk(id);
        // console.log(finduser);

        if (!finduser) {
            return res.status(404).json({
                status: "error",
                message: "no user found"
            });
        }

        await finduser.update({ user_name:name, phone_number });

        res.status(200).json({ status: "success", message: "user updated successfully" });
        
    } catch (error) {
         res.status(500).json({
            status: "error",
            message: "internal server error",
            error: error
        });
    }
}

const deleteUser = async(req,res)=>{
    const {id} = req.params;

    const findDelete = await user.findByPk(id);

 
    
    if(!findDelete){
        res.status(404).json({
            "status":"error",
            "message" : "no user found to delete"
        })
    }

    await findDelete.destroy();
    return res.status(204).json({message:"no content found"})

}


const loginUser = async(req,res)=>{
    try{

        const {email, password} = req.body;

        if(!email || !password || password == '' || email == ''){
            res.status(204).json({message:"no data given in body"})
        }
        
        const isVerified = bcrypt.compare(password, user.password);
        if(!isVerified){
            res.status(401).json({
                status:"error",
                message:"You are not allowed to login",
                data:"email or password is wrong"
            })
        }
        else{
            const token = jwt.sign({user:user.name, email:user.email}, process.env.JWT_SECRET, {expiresIn:'1hr'})
             res.status(200).json({
                status:"success",
                message:"welcome to our website",
                jwt_token:`here is your token :-  ${token}`
             })
        }
       
    }
    catch (error) {
         res.status(500).json({
            status: "error",
            message: "internal server error",
            error: error
        });
    }
}



module.exports = {signup,getusers,updateuser,updatesinglevalue,deleteUser, loginUser}