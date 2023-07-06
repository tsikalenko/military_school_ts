import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventsSchema = new Schema(
    {
        title: {
            type: Schema.Types.String,
            required: true,
        },
        price: {
            type: Schema.Types.Number,
            required: true,
        },
        startDate: {
            type: Schema.Types.String,
            required: true,
        },
        startTime: {
            type: Schema.Types.String,
            required: true,
        },
        endDate: {
            type: Schema.Types.String,
            required: true,
        },
        endTime: {
            type: Schema.Types.String,
            required: true,
        },
        description: {
            type: Schema.Types.String,
            required: true,
        },
        img: {
            type: Schema.Types.String,
        },
        letterSubject: {
            type: Schema.Types.String,
            required: true,
        },
        letterHtml: {
            type: Schema.Types.String,
            required: true,
        },
        payBtn: {
            type: Schema.Types.String,
        },
        fields: {
            type: Schema.Types.Mixed,
            required: true,
        },
        maxQuantity: {
            type: Schema.Types.Number,
            required: true,
        },
        freeSlots: {
            type: Schema.Types.Number,
            required: true,
        },
        enable: {
            type: Schema.Types.Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

const Events = mongoose.model('events', EventsSchema);

export default Events;
