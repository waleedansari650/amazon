const app = require('express');
const { upload } = require('../middlewares/productMiddleware');
const { getAllProducts, getParticularProduct, addToCartProduct, cartDetails, removeItemFromCart, addProduct, deleteProduct, updateProduct, deleteItem } = require('../controllers/productController');
const authenticate = require('../middlewares/authenticate');
const router = app.Router();

router.post('/addProduct', upload.single('testImage'), addProduct);
router.put('/updateProduct/:id', upload.single('testImage'), updateProduct);
router.get("/getproducts", getAllProducts);
router.get('/getproductsone/:id', getParticularProduct);
router.post("/addcart/:id", authenticate, addToCartProduct);
router.get('/cartdetails', authenticate, cartDetails);
router.delete('/deleteProduct/:id', authenticate, deleteProduct);
// router.get('/deleteItem/:id', authenticate, deleteItem);
router.delete('/remove/:id', authenticate, removeItemFromCart);


module.exports = router;


