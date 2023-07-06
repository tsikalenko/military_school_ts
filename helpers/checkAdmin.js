import jwt from 'jsonwebtoken';

const checkAdmin = (token) => {
    const { isAdmin } = jwt.verify(token, process.env.KEY);
    return isAdmin;
};

export default checkAdmin;
