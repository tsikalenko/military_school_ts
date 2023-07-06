import Router from 'express';
import { check } from 'express-validator';
import {
    sendEventParticipants,
    sendMessageTeamBuilding,
} from '../helpers/sendMessageTeamBuilding.js';

const mailerRouter = new Router();

mailerRouter.post(
    '/team-building',
    [
        check('name', "name can't is empty").notEmpty(),
        check('phone', "phone can't is empty").notEmpty(),
        check('quantity', "quantity can't is empty").notEmpty(),
    ],
    sendMessageTeamBuilding
);

mailerRouter.post(
    '/event',
    [
        check('participantList', "participantList can't is empty").notEmpty(),
        check('eventId', "eventId can't is empty").notEmpty(),
    ],
    sendEventParticipants
);

export default mailerRouter;
