import Router from 'express';
import { check } from 'express-validator';
import ParticipantsController from '../controllers/participants.controller.js';

const participantsRouter = new Router();

participantsRouter.post(
    '/',
    [
        check('eventId', "eventId can't is empty").notEmpty(),
        check('email', "email can't is empty").notEmpty(),
        check('letterSubject', "letterSubject can't is empty").notEmpty(),
        check('letterHtml', "letterHtml can't is empty").notEmpty(),
        check('data', "data can't is empty").notEmpty(),
    ],
    ParticipantsController.createParticipant
);

participantsRouter.get('/', ParticipantsController.readParticipant);

participantsRouter.post(
    '/event',
    [
        check('eventId', "eventId can't is empty").notEmpty(),
        check('email', "email can't is empty").notEmpty(),
        check('token', "Token can't is empty").notEmpty(),
    ],
    ParticipantsController.eventsParticipant
);

participantsRouter.put(
    '/',
    [
        check('eventId', "eventId can't is empty").notEmpty(),
        check('data', "data can't is empty").notEmpty(),
        check('token', "Token can't is empty").notEmpty(),
    ],
    ParticipantsController.updateParticipants
);

participantsRouter.delete(
    '/:participantId',
    ParticipantsController.deleteParticipant
);

export default participantsRouter;
