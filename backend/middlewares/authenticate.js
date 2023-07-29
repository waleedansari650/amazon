const jwt = require('jsonwebtoken');
const USER = require('../models/userSchema');
require('dotenv').config();
const secretKey = process.env.SECRET;

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.Amazonweb;
        const verifyToken = jwt.verify(token, secretKey);
        console.log("Verify Token : ", verifyToken);
        const rootUser = await USER.findOne({ _id: verifyToken._id, "tokens.token": token });
        console.log("Root User", rootUser);
        if (!rootUser) {
            throw new Error("User not found");
        }
        //token hold the token, rootUser hold whole detail of the user & the userId hold the id of the user
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).json("unauthorized : no token provided ");
        console.log("Middle Ware Error : ", error);
    }


}
module.exports = authenticate;






