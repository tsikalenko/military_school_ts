import { validationResult } from 'express-validator';
import Participants from '../models/participants.js';
import Events from '../models/events.js';
import checkAdmin from '../helpers/checkAdmin.js';
import sendEmail from '../helpers/mailSender.js';
import sendToTelegram from '../helpers/sendToTelegram.js';
import createLeadMsg from '../helpers/createLeadMsg.js';

class ParticipantsController {
    async createParticipant(req, res) {
        try {
            const errors = validationResult(req);
            const { eventId, email, letterSubject, letterHtml, data } =
                req.body;
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect data', errors });
            }
            const event = await Events.findOne({ _id: eventId });
            const participant = await Participants.create({
                eventId,
                data,
                payment: 0,
            });

            const eventsParticipant = await Participants.find({ eventId });
            if (event.maxQuantity <= eventsParticipant.length) {
                const filter = { _id: eventId };
                const update = {
                    enable: false,
                };

                await Events.findOneAndUpdate(filter, update, {
                    new: true,
                });
            }

            const newLetterHtml =
                letterHtml +
                `
                    <a href='https://military-school.herokuapp.com/participant/delete/${participant._id}' 
                    target='_blank' 
                    style='font-size: 18px;
                    display: block;
                    cursor: pointer;
                    text-align: center;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    padding: 15px 0;
                    margin: 20px auto;
                    width: 50%;
                    border: 2px solid #000000;
                    color: #808000;
                    text-decoration: none;''>
                        Видалити реєстрацію
                    </a>
                `;

            await sendEmail(email, letterSubject, newLetterHtml);
            await sendToTelegram(createLeadMsg(data, event));

            return res.json(participant);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async readParticipant(req, res) {
        try {
            const { id } = req.query;
            const event = await Participants.findOne({ _id: id });
            if (event) {
                return res.json(event);
            }
            return res.status(400).json({ message: 'Event not found' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async eventsParticipant(req, res) {
        try {
            const { eventId, token } = req.body;
            if (checkAdmin(token)) {
                const event = await Participants.find({ eventId });
                if (event) {
                    return res.json(event);
                }
                return res.status(400).json({ message: 'Event not found' });
            }
            return res.status(400).json({
                message: 'You have not permission for this response',
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateParticipants(req, res) {
        try {
            const { _id, eventID, data, payment, token } = req.body;
            if (checkAdmin(token)) {
                const event = await Participants.findOne({ _id });

                if (!event) {
                    return res.status(400).json({ message: 'Event not found' });
                }

                const filter = { _id };
                const update = {
                    eventID,
                    data,
                    payment,
                };

                const newEvent = await Participants.findOneAndUpdate(
                    filter,
                    update,
                    {
                        new: true,
                    }
                );

                return res.json(newEvent);
            }
            return res.status(400).json({
                message: 'You have not permission for this response',
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteParticipant(req, res) {
        try {
            const { participantId } = req.params;

            const result = await Participants.deleteOne({ _id: participantId });

            if (result.deletedCount > 0) {
                return res.json({ message: 'Participant was deleted' });
            }

            return res.status(400).json({ message: 'Something going wrong' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default new ParticipantsController();
