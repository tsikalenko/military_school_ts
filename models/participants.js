import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ParticipantsSchema = new Schema(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'events',
            required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            required: true,
        },
        payment: {
            type: Schema.Types.Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Participants = mongoose.model('participants', ParticipantsSchema);

export default Participants;
