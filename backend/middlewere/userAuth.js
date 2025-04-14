const jwt= require('jsonwebtoken');

const userAuth=async(req,res,next)=>{
const {token}=req.cookies;
if(!token){
    return res.status(401).json({success:false,message:'Unauthorized'});
}

try{
const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

if(decodedToken.id){
    req.body.userId=decodedToken.id;
}else{
    return res.status(401).json({success:false,message:'Unauthorized'});
}
 next();
}catch(err){
    
    return res.status(500).json({success:false,message:'Internal server error'});

}

}


module.exports={userAuth};