require('dotenv').config();
const User = require('../models/user');


const getUserInfo = async (req, res) => {

    try{
        const {userId} = req.body; // Assuming you have middleware that sets req.user

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID not found' });
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userInfo={
            name: user.name,
            email: user.email,
           isAccountVerified: user.verify,

        }

        return res.json({ success: true, data: userInfo });

    }catch(err){
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }

}

module.exports = {
    getUserInfo
}