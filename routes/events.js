import Router from 'express';
import { check } from 'express-validator';
import EventsController from '../controllers/events.controller.js';

const eventsRouter = new Router();

eventsRouter.post(
    '/',
    [
        check('title', "Title can't is empty").notEmpty(),
        check('startDate', "startDate can't is empty").notEmpty(),
        check('endDate', "endDate can't is empty").notEmpty(),
        check('startTime', "startTime can't is empty").notEmpty(),
        check('endTime', "endTime can't is empty").notEmpty(),
        check('description', "Description can't is empty").notEmpty(),
        check('fields', "Fields can't is empty").notEmpty(),
        check('maxQuantity', "maxQuantity can't is empty").notEmpty(),
        check('enable', "Enable can't is empty").notEmpty(),
    ],
    EventsController.createEvent
);

eventsRouter.get('/', EventsController.readEvent);

eventsRouter.get('/enable', EventsController.getEnableEvents);

eventsRouter.put(
    '/',
    [
        check('id', "ID can't is empty").notEmpty(),
        check('title', "Title can't is empty").notEmpty(),
        check('date', "Date can't is empty").notEmpty(),
        check('letterSubject', "Letter Subject can't is empty").notEmpty(),
        check('letterHtml', "Letter Html can't is empty").notEmpty(),
        check('fields', "Fields can't is empty").notEmpty(),
        check('maxQuantity', "maxQuantity can't is empty").notEmpty(),
        check('enable', "Enable can't is empty").notEmpty(),
    ],
    EventsController.updateEvent
);

eventsRouter.delete(
    '/',
    [check('id', "ID can't is empty").notEmpty()],
    EventsController.deleteEvent
);

export default eventsRouter;
