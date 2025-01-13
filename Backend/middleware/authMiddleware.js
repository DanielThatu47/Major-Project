import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token missing.' });
    }

    if (token !== process.env.JWT_SECRET) {
        return res.status(403).json({ success: false, message: 'Invalid access token.' });
    }

    next();
};

export default authMiddleware;
