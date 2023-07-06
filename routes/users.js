import Router from 'express';
import UserController from '../controllers/users.controller.js';
import { check } from 'express-validator';

const users = new Router();

users.post(
    '/registration',
    [
        check('username', "Username can't is empty").notEmpty(),
        check(
            'password',
            'password must be longer then 4 chars but shorter 10'
        ).isLength({ min: 4, max: 20 }),
    ],
    UserController.userCreate
);

users.post(
    '/login',
    [
        check('username', "Username can't is empty").notEmpty(),
        check('password', "Password can't is empty").notEmpty(),
    ],
    UserController.getToken
);

users.post(
    '/admin',
    [check('token', "Token can't is empty").notEmpty()],
    UserController.isAdmin
);

users.put(
    '/user/update',
    [
        check('username', "Username can't be empty").notEmpty(),
        check(
            'password',
            'password must be longer then 4 chars but shorter 10'
        ).isLength({ min: 4, max: 20 }),
    ],
    UserController.updateUser
);

users.post(
    '/user',
    [check('token', "Token can't be empty").notEmpty()],
    UserController.getUser
);

users.delete(
    '/user',
    [check('token', "Token can't be empty").notEmpty()],
    UserController.deleteUser
);

export default users;
