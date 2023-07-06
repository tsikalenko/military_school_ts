import Router from 'express';
import { sendSuccessfulPayment } from '../helpers/sendMessageTeamBuilding.js';
import multer from 'multer';

const paymentRouter = new Router();

paymentRouter.post('/successful', multer().none(), sendSuccessfulPayment);
paymentRouter.post('/error', (req, res) => {
    res.redirect('../../payment/error');
});

export default paymentRouter;
