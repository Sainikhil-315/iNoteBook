var jwt = require('jsonwebtoken');
const JWT_SECRET = 'nikhil';

const fetchUser = (req, res, next) => {
    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Unauthorized access" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Unauthorized token" });
    }
}

module.exports = fetchUser;