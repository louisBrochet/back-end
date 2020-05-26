const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.cookies['access_token'];
        if (token) {
            verify(token, process.env.CLE_TOKEN, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    }
};
