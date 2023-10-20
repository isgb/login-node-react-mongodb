import  jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if(err) reject(err);
                // res.json({ token })
                resolve(token)
                
            }
        );
    })
}

// jwt.sign(
//     {
//         id: userSaved._id,
//     },
//     "secret123",
//     {
//         expiresIn: "1d",
//     },
//     (err, token) => {
//         if(err) console.log(err);
//         // res.json({ token })
        
//     }
// );