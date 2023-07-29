const express = require('express');
const router = express.Router();
const Products = require('../models/productsSchema');
const USER = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const BuyDetail = require('../models/buyDetailSchema');
const FinalOrder = require('../models/finalOrderSchema');
const DeliverOrders = require('../models/delieverOrderSchema');


module.exports.proceedToBuy = async (req, res) => {
    await BuyDetail.deleteMany({ userId: req.userID });
    const { houseNo, area, landmark, city, province } = req.body;
    try {
        const user = await USER.findOne({ _id: req.userID })
        if (user) {
            const proceedData = new BuyDetail({
                userId: req.userID,
                houseNo,
                area,
                landmark,
                city,
                province,
            })
            await proceedData.save();
            if (proceedData) {
                return res.status(200).json(proceedData);
            }
        }
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json('Some erorr occured');
    }

}

module.exports.getBuyDetail = async (req, res) => {
    try {
        const buyData = await BuyDetail.findOne({ userId: req.userID });
        res.status(200).json(buyData);
    } catch (error) {
        res.status(400).json(error);
    }

}
module.exports.finalOrder = async (req, res) => {

    const { name, email, address, orders, contactNumber, totalAmount } = req.body;
    try {
        const user = await USER.findOne({ _id: req.userID });
        if (user) {
            const proceedData = new FinalOrder({
                userId: req.userID,
                name,
                email,
                address,
                orders,
                contactNumber,
                totalAmount,
                paymentStatus: "Delievery On Cash",
            })
            await proceedData.save();
            if (proceedData) {
                res.status(200).json(proceedData);
                await BuyDetail.deleteMany({ userId: req.userID });
                await USER.findByIdAndUpdate(req.userID, { $set: { carts: [] } }, { new: true })




            }
        } else {
            res.status(401).json({ error: "Failed To Place Order   !!!" });

        }

    } catch (error) {
        res.status(400).json(error);

    }
}
module.exports.getPlaceOrders = async (req, res) => {
    try {
        const placeOrders = await FinalOrder.find();
        res.status(200).json(placeOrders);
    } catch (error) {
        res.status(400).json(error);
    }
}
module.exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        let order = await FinalOrder.findById(id);
        if (!order) {
            res.status(402).json({ msg: "order cannot be exist" })
        }
        order = await FinalOrder.findByIdAndDelete(id);
        res.status(200).json({ msg: "order can be deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
}
module.exports.getParticularOrder = async (req, res) => {
    const { id } = req.params;
    try {
        let placeOrder = await FinalOrder.findById(id);
        if (!placeOrder) {
            res.status(402).json({ msg: 'no order found' })
        } else {

        }
    } catch (error) {

    }
}
module.exports.delieverOrder = async (req, res) => {
    const { orderId, name, address, contactNumber, orders, totalAmount, orderPost } = req.body;

    if (!orderId || !name || !address || !contactNumber || !orders || !totalAmount || !orderPost) {
        return res.status(422).json({ error: "order detail required" });
    }
    try {
        const delieverOrder = new DeliverOrders({
            orderId, name, address, contactNumber, orders, totalAmount, orderPost
        })
        await delieverOrder.save()
        if (delieverOrder) {
            await FinalOrder.findByIdAndDelete({ _id: orderId })
            return res.status(200).json({ msg: "Product deliever successfully", delieverOrder })

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Some error occurred" })
    }

}
module.exports.getDelieverOrders = async (req, res) => {
    try {
        const deliverOrders = await DeliverOrders.find();
        res.status(200).json(deliverOrders);
    } catch (error) {
        res.status(400).json(error);
    }
}
module.exports.deleteDeleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        let order = await DeliverOrders.findById(id);
        if (!order) {
            res.status(402).json({ msg: "order cannot be exist" })
        }
        order = await DeliverOrders.findByIdAndDelete(id);
        res.status(200).json({ msg: "order can be deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
}


