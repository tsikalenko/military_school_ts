import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bp from 'body-parser';
import * as path from 'path';
import pagesRouter from './routes/pages.js';
import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import eventsRouter from './routes/events.js';
import participantsRouter from './routes/participants.js';
import mailer from './routes/mailer.js';
import payment from './routes/payment.js';
import urlRouter from './routes/urls.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/api/auth', usersRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/urls', urlRouter);
app.use('/api/events', eventsRouter);
app.use('/api/participants', participantsRouter);
app.use('/api/mailer', mailer);
app.use('/api/payment', payment);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('DB connected');
    });

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
