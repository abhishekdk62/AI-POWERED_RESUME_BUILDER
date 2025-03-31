const jwt = require('jsonwebtoken');

const generateWebToken = (res, userId, role) => {
    if (!userId) throw new Error('User ID is required');

    const JWT_SECRET = process.env.JWT_SECRET || "demo000";

    const token = jwt.sign({ id: userId, role }, JWT_SECRET, {
        expiresIn: '2h',
    });

    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        maxAge: 60 * 60 * 1000, 
        sameSite: "Lax"
    });
};

module.exports = generateWebToken;
