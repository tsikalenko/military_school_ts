import axios from 'axios';

const sendToTelegram = async (message) => {
    await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.CHAT_ID,
            text: message,
            parse_mode: 'html',
        }
    );
};

export default sendToTelegram;
