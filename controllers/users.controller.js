import Users from '../models/users.js';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import checkAdmin from '../helpers/checkAdmin.js';

class UserController {
    async userCreate(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Create User error', errors });
            }
            const { username, password } = req.body;
            const existingUser = await Users.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'this login is busy' });
            }
            const hashPassword = crypto
                .pbkdf2Sync(password, process.env.KEY, 7, 16, 'sha512')
                .toString('hex');
            const user = await Users.create({
                ...req.body,
                isAdmin: false,
                password: hashPassword,
            });
            return res.json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getToken(req, res) {
        try {
            const { username, password } = req.body;
            const user = await Users.findOne({ username });
            if (user) {
                const hashPassword = crypto
                    .pbkdf2Sync(password, process.env.KEY, 7, 16, 'sha512')
                    .toString('hex');
                if (user.password === hashPassword) {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            username: user.username,
                            isAdmin: user.isAdmin,
                        },
                        process.env.KEY,
                        {
                            expiresIn: '24h',
                        }
                    );
                    return res.json({ token });
                }
            }
            return res.status(400).json({ message: 'wrong login or password' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async isAdmin(req, res) {
        try {
            const { token } = req.body;
            const isAdmin = checkAdmin(token);

            return res.json({ isAdmin });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getUser(req, res) {
        try {
            const { name } = req.body;
            const user = await Users.findOne({ name });
            if (user) {
                return res.json(user);
            }
            res.status(400).json({ message: 'User not found' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const {
                token,
                username,
                password,
                firstName,
                lastName,
                email,
                family,
                photo,
            } = req.body;
            const { userId } = jwt.verify(token, process.env.KEY);
            const oldUser = await Users.findOne({ _id: userId });
            if (!oldUser) {
                return res.status(400).json({ message: 'User not found' });
            }

            const users = await Users.find({ username });

            if (username !== oldUser.username && users.length > 0) {
                return res.status(400).json({ message: 'this login is busy' });
            }

            const filter = { _id: userId };
            const hashPassword = crypto
                .pbkdf2Sync(password, process.env.KEY, 7, 16, 'sha512')
                .toString('hex');
            const update = {
                username,
                password: hashPassword,
                firstName,
                lastName,
                email,
                family,
                photo,
            };

            const user = await Users.findOneAndUpdate(filter, update, {
                new: true,
            });
            res.json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { token } = req.body;
            const { userId } = jwt.verify(token, process.env.KEY);

            const result = await Users.deleteOne({ _id: userId });

            if (result.deletedCount > 0) {
                return res.json({ message: 'user was deleted' });
            }

            return res.status(400).json({ message: 'something going wrong' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default new UserController();
