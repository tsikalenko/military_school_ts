import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PagesSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    { timestamps: true }
);

const Pages = mongoose.model('pages', PagesSchema);

export default Pages;
