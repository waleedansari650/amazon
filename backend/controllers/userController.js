const express = require('express');
const USER = require('../models/userSchema');
const bcrypt = require('bcryptjs');

//sign up user controller
module.exports.userRegister = async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body;
    if (!fname || !email || !mobile || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the data" });
        console.log("No data Available");
    }
    try {
        const user = await USER.findOne({ email });
        if (user) {
            return res.status(422).json({ error: "This  user is already Present" })
        }
        else if (password !== cpassword) {
            return res.status(422).json({ error: "Password and confirm Password does not match" })
        }
        else {
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });
            const storedata = await finalUser.save();
            console.log("User  : ", storedata);
            return res.status(201).json(storedata);

        }
    } catch (error) {
        return res.status(400).json("ERror :", error);
    }
}
//login user controller
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body : ', req.body);
    if (!email, !password) {
        res.status(400).json({ error: "Fill all the data" })
    }
    try {
        const userLogin = await USER.findOne({ email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            console.log(isMatch);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Details" });
            } else {
                const token = await userLogin.generateAuthToken();
                console.log("Token : ", token);
                //secret & option
                res.cookie("Amazonweb", token, {
                    expire: new Date(Date.now() + 2000000),
                    httpOnly: true
                })
                console.log("Token", token);
                res.status(201).json(userLogin);

            }
        } else {
            res.status(400).json({ error: "Invalid Details" });

        }

    } catch (error) {
        res.status(400).json("Invalid Detail");

    }
}
//validate user controller
module.exports.validateUserController = async (req, res) => {
    try {
        const validUserOne = await USER.findOne({ _id: req.userID });
        res.status(201).json(validUserOne);
    } catch (error) {

    }
}
//logout user Controller
module.exports.logoutUser = async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currentItem) => {
            currentItem.token !== req.token
        });
        res.clearCookie("Amazonweb", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("User Logout");

    } catch (error) {
        console.log("Error for user logout");
    }
}
module.exports.getUsers = async (req, res) => {
    try {
        const users = await USER.find();
        if (users) {
            return res.status(200).json(users);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Some errorr occurred");
    }
}

module.exports.getParticularUser = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await USER.findById(id);
        if (response) {
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Some errorr occurred");
    }

}
module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        let user = await USER.findById(id);
        if (!user) {
            return res.status(402).json({ msg: "user cannot be exist" })
        }
        user = await USER.findByIdAndDelete(id);
        return res.status(200).json({ msg: "user can be deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
}

module.exports.editUser = async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body;
    if (!fname || !email || !mobile || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the data" });
        console.log("No data Available");
    }
}
// module.exports.editUserCredientials = async (req, res) => {
//     const { fname, email, mobile, password, cpassword } = req.body;
//     const { id } = req.userID;
//     if (!fname || !email || !mobile || !password || !cpassword) {
//         return res.status(422).json({ error: "Fill all the data" });
//         console.log("No data Available");
//     }
//     try {
//         const user = await USER.findOne({ id });
//         if (!user) {
//             return res.status(422).json({ error: "This  user is already Present" })
//         }
//         else if (password !== cpassword) {
//             return res.status(422).json({ error: "Password and confirm Password does not match" })
//         }
//         else {
//             let editUser = {};
//             editUser = { fname, email, mobile, password, cpassword }
//             req.rootUser.tokens = req.rootUser.tokens.filter((currentItem) => {
//                 currentItem.token !== req.token
//             });
//             res.clearCookie("Amazonweb", { path: "/" });
//             req.rootUser.save();
//             const token = await userLogin.generateAuthToken();
//             console.log("Token : ", token);
//             res.cookie("Amazonweb", token, {
//                 expire: new Date(Date.now() + 2000000),
//                 httpOnly: true
//             })
//             console.log("Token", token);
//             res.status(201).json(userLogin);
//             const finalUser = new USERfindByIdAndUpdate(req.userID, { $set: editUser }, { new: true });
//             const storedata = await finalUser.save();
//             console.log("User  : ", storedata);
//             return res.status(201).json(storedata);

//         }
//     } catch (error) {
//         return res.status(400).json("ERror :", error);
//     }
// }


