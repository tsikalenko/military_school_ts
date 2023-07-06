import { validationResult } from 'express-validator';
import Urls from '../models/urls.js';

class UrlsController {
    async createUrl(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect data', errors });
            }
            const { name } = req.body;
            const existingUrls = await Urls.findOne({ name });
            if (existingUrls) {
                return res
                    .status(400)
                    .json({ message: 'This page is created earlier' });
            }
            const url = await Urls.create({
                ...req.body,
            });

            return res.json(url);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async readUrl(req, res) {
        try {
            const { name } = req.query;
            const url = await Urls.findOne({ name });
            if (url) {
                return res.json(url);
            }
            res.status(400).json({ message: 'Url not found' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateUrl(req, res) {
        try {
            const { _id, url } = req.body;
            const existingUrl = await Urls.findOne({ _id });
            if (!existingUrl) {
                return res.status(400).json({ message: 'Url not found' });
            }

            const filter = { _id };
            const update = {
                url,
            };

            const newUrl = await Urls.findOneAndUpdate(filter, update, {
                new: true,
            });

            res.json(newUrl);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteUrl(req, res) {
        try {
            const { _id } = req.body;

            const result = await Urls.deleteOne({ _id });

            if (result.deletedCount > 0) {
                return res.json({ message: 'Page was deleted' });
            }

            res.status(400).json({ message: 'Something going wrong' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default new UrlsController();
