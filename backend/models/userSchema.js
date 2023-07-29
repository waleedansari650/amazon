const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET;
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email address")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 14
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }

        }],
    carts: Array
})
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})
userSchema.methods.generateAuthToken = async function () {
    try {

        //payload and the secret the user
        let newToken = jwt.sign({ _id: this._id }, secretKey);
        this.tokens = this.tokens.concat({ token: newToken });
        await this.save();
        return newToken;
    } catch (error) {
        console.log(error);
    }
}
userSchema.methods.addcartdata = async function (cart) {
    try {
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;

    } catch (error) {
        console.log(error);
    }

}
const USER = new mongoose.model("USER", userSchema);

module.exports = USER;


