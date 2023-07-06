import sendToTelegram from './sendToTelegram.js';
import Events from '../models/events.js';

export const sendMessageTeamBuilding = async (req, res) => {
    try {
        const { name, phone, quantity } = req.body;

        await sendToTelegram(
            `<b>Розрахунок корпоративу</b>\nІм'я: ${name}\nТелефон: ${phone}\nКількість чоловік: ${quantity}`
        );

        return res.json();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const sendSuccessfulPayment = async (req, res) => {
    try {
        const { email, phone, amount, currency } = req.body;

        await sendToTelegram(
            `<b>Нова сплата</b>\nEmail: ${email}\nТелефон: ${phone}\nСумма: ${amount} ${currency}`
        );

        return res.redirect('../../payment/successful');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const sendEventParticipants = async (req, res) => {
    try {
        const { participantList, eventId } = req.body;

        const event = await Events.findOne({ _id: eventId });

        const text = participantList.map((participant, index) => {
            const keys = Object.keys(participant.data);
            const participantData = keys.map((field) => {
                return `\n${field}: ${participant.data[field]}`;
            });
            return `\n\n\nУчасник ${index + 1}\n${participantData}\n${
                participant.payment
            } грн.`;
        });

        await sendToTelegram(
            `<b>${event.title}</b>\n${event.startDate}, ${event.startTime}\nВсього зареестровано - ${participantList.length}\n${text}`
        );

        return res.json();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
