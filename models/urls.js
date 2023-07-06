import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UrlsSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        url: {
            type: Schema.Types.String,
            required: true,
        },
    },
    { timestamps: true }
);

const Urls = mongoose.model('urls', UrlsSchema);

export default Urls;
