
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req,res,next) => {
    // console.log("validing token")
    // next();
    // console.log(req.headers);
    // next();

    // const cookies = req.cookies;
    // console.log(cookies)
    const {token} = req.cookies;

    if(!token)
        return res.status(401).json({ message: "No token, authorization denied" });

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid token" })

            // console.log(user)
            req.user = user

            next();
        })

}