const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const auth = require('../controllers/middleware/auth');

/** Add a product scan in history */
router.post('/add-product/history/:id', auth, userController.addProductInHistory);

/** Get stats & last product scanned */
router.get('/stat-history/:id', auth, userController.getStatsAndLastProduct);

/** Get history of scan products */
router.get('/history/:id', auth, userController.getHistoryOfUser);

/** Get all users */
router.get('/all', auth, userController.getAllUsers);

/** Get information profile */
router.get('/:id', auth, userController.getInformationOfUser);

/** Edit information profile */
router.put('/:id', auth, userController.editInformationOfUser);

/** Delete a user */
router.delete('/delete/:id', auth, userController.deleteUser);

/** Login */
router.post('/login', userController.login);

/** Logout */
router.get('/auth/logout', auth, userController.logout);


module.exports = router;