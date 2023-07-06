import Router from 'express';
import PagesController from '../controllers/pages.controller.js';
import { check } from 'express-validator';

const pageRouter = new Router();

pageRouter.post(
    '/',
    [
        check('name', "Name can't is empty").notEmpty(),
        check('data', "Data can't is empty").notEmpty(),
    ],
    PagesController.createPage
);

pageRouter.get(
    '/',
    [check('name', "Name can't is empty").notEmpty()],
    PagesController.readPage
);

pageRouter.put(
    '/',
    [
        check('_id', "_id can't is empty").notEmpty(),
        check('data', "Data can't is empty").notEmpty(),
    ],
    PagesController.updatePage
);

pageRouter.delete(
    '/',
    [check('_id', "_id can't is empty").notEmpty()],
    PagesController.deletePage
);

export default pageRouter;
