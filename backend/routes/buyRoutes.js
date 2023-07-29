const app = require('express');
const { proceedToBuy, getBuyDetail, finalOrder, getPlaceOrders, deleteOrder, delieverOrder, getParticularOrder, getDelieverOrders, deleteDeleteOrder } = require('../controllers/buyController');
const authenticate = require('../middlewares/authenticate');
const router = app.Router();


router.post('/proceedToBuy', authenticate, proceedToBuy);
router.get('/getBuyDetail', authenticate, getBuyDetail);
router.post('/finalOrder', authenticate, finalOrder);
router.get('/getPlaceOrders', getPlaceOrders);
router.delete('/deleteOrder/:id', authenticate, deleteOrder);
router.delete('/deleteDeleteOrder/:id', authenticate, deleteDeleteOrder);
router.get('getParticularOrder/:id', authenticate, getParticularOrder);
router.post('/delieverOrder', delieverOrder);
router.get('/getDelieverOrders', getDelieverOrders);









module.exports = router;






