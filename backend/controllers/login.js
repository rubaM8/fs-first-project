require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const transporter = require('../config/mail');


const login = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill all the fields' });
    }

    try {

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'user with this email not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'password invalid' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.json({ success: true, message: 'Login successful' })


    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }


}

const logout = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: 'Logout successful' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }

}


const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Please provide email' })
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp=otp
        user.resetOtpExpiredAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
        await user.save();

        const mailOptions={
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
        }

        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: 'OTP sent to your email' })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }


}


const resetPassword= async(req,res)=>{
const {email,otp,password}=req.body;
if(!email || !otp || !password){
    return res.status(400).json({success:false,message:'Please fill all the fields'})
}

try{
const user=User.findOne({email:email});
if(!user){
    return res.status(400).json({success:false,message:'User not found'})
}

if(user.resetOtp==="" || user.resetOtp!== otp){
    return res.status(400).json({success:false,message:'Invalid OTP'})
}

if(user.resetOtpExpiredAt<Date.now()){
    return res.status(400).json({success:false,message:'OTP expired'})
}

const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);
user.password=hashedPassword;
user.resetOtp="";
user.resetOtpExpiredAt=0;
await user.save();
return res.json({success:true,message:'Password reset successfully'})

}catch(err){
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' })
}
}

module.exports = {
    login,
    logout,
    sendResetOtp,
    resetPassword
}