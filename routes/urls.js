import Router from 'express';
import UrlsController from '../controllers/urls.controller.js';
import { check } from 'express-validator';

const urlRouter = new Router();

urlRouter.post(
    '/',
    [
        check('name', "Name can't is empty").notEmpty(),
        check('url', "Url can't is empty").notEmpty(),
    ],
    UrlsController.createUrl
);

urlRouter.get(
    '/',
    [check('name', "Name can't is empty").notEmpty()],
    UrlsController.readUrl
);

urlRouter.put(
    '/',
    [
        check('_id', "_id can't is empty").notEmpty(),
        check('url', "Url can't is empty").notEmpty(),
    ],
    UrlsController.updateUrl
);

urlRouter.delete(
    '/',
    [check('_id', "_id can't is empty").notEmpty()],
    UrlsController.deleteUrl
);

export default urlRouter;
