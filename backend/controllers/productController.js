const express = require('express');
const Products = require('../models/productsSchema');
const USER = require('../models/userSchema');
const cloudinary = require('../utils/cloudinary');

//get al products
module.exports.getAllProducts = async (req, res) => {
    try {
        const productstData = await Products.find();
        res.status(201).json(productstData);
    } catch (error) {
        console.log("error" + error.message);
    }
};
//get the particular product
//Add to cart the product
module.exports.addToCartProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ _id: id });
        const UserContact = await USER.findOne({ _id: req.userID });
        if (UserContact) {
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log("Cart Data : ", cartData);
            res.status(200).json(UserContact);
        } else {
            res.status(401).json({ error: "Invalid Data !!!" });
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid Data !!!" });

    }
}
//get the details of the products
module.exports.cartDetails = async (req, res) => {
    try {
        const buyUser = await USER.findById({ _id: req.userID });
        return res.status(201).json(buyUser);
    } catch (error) {
        return res.status(200).json(error)
    }
}
//remove the items from cart
module.exports.removeItemFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((current) => {
            return current._id != id;
        })
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("Item remove ID : ", id);
    } catch (error) {
        console.log("Error : ", error);
        res.status(400).json(req.rootUser);
    }
}

//routes to add the product  into the database
module.exports.addProduct = async (req, res) => {
    const { title, price, description, longDescription } = req.body;
    if (!title || !price || !description || !longDescription) {
        return res.status(422).json({ error: "product detail required" });
        console.log("No detail of the data provided");
    }
    try {
        if (!req.file) {
            res.status(400).json({ errror: "Unfailed to upload image" });
            return
        }
        const product = new Products({
            title,
            price,
            description,
            longDescription,
            image: `http://localhost:4000/uploads/${req.file.filename}`
        })
        //to product the image on cloudinary
        await product.save();
        if (product) {
            return res.status(200).json({ message: "Product Added Successfully", product });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Some error occurred" })
    }
}
//delete Product
module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        let product = await Products.findById(id);
        if (!product) {
            res.status(402).json({ msg: "product cannot be exist" })
        }
        product = await Products.findByIdAndDelete(id);
        res.status(200).json({ msg: "product can be deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
}

module.exports.updateProduct = async (req, res) => {
    const { title, price, description, longDescription } = req.body;
    try {
        let newProduct = {}
        if (req.file) {
            newProduct = { title, price, description, longDescription, image: `http://localhost:4000/uploads/${req.file.filename}` }
        } else {
            newProduct = { title, price, description, longDescription }
        }
        let product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "The Product cannot exist" })
        }
        product = await Products.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });
        return res.status(200).json({ message: "Product Added Successfully", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Some error occurred" })
    }
}

module.exports.getParticularProduct = async (req, res) => {
    const response = await Products.findById({ _id: req.params.id });
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(400).json({ result: "Failed to get the user" });
    }
}
module.exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
}


