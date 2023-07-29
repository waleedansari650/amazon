const Products = require('./models/productsSchema');
const productsdata = require('./constant/productsdata');

const DefaultData = async () => {
    try {
        await Products.deleteMany({})
        const storeData = await Products.insertMany(productsdata);
        console.log("Store Data : ", storeData);
    } catch (error) {
        console.log("Error : ", error.message);
    }
}

module.exports = DefaultData;