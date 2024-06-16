import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export function generateAccessToken(username: string) {
    const secret = process.env.JWT_SECRET;
    console.log(secret);

    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    const payload = { username };
    return jwt.sign(payload, secret, { expiresIn: '1800s' });
}

interface CustomRequest extends Request {
    user?: any;
}

export async function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("Auth Header:", authHeader);
    console.log("Token: ", token);

    if (token == null) {
        return res.sendStatus(401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    jwt.verify(token, secret, (err, user) => {
        console.log(err);
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
