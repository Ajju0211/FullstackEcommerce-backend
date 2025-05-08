
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'




export function verifyToken(req: Request, res: Response, next: NextFunction) {

    const token: unknown = req.cookies['Authorization'];

    if (!token) {
        res.status(401).json({ error: "Access denied" });
       
    }
    try {
        if (typeof token == 'string') {
            const decoded = jwt.verify(token, 'your-secret');
            if(typeof decoded != 'object' || decoded?.usersId){
                res.status(401).json({Error: "Access denied"});
        
            }

      
            req.body.seller = decoded.role;
            req.body.userId = decoded.userId;
            next();
        } else{
             res.status(401).json({Error: "Access denied"});
            
        }
    } catch (err) {
         res.status(401).json({Error: "Access denied"});
    }
}
export function verifySeller(req: Request, res: Response, next: NextFunction) {
    try{
    const role: string = req.body.role;
    if(role != 'seller'){
        res.status(401).send({"Error": "You are not Authorized"})
        return
    }
    next()
    } catch(err) {
        res.status(401).send({"Error": "You are not Authorized"})
        return
    }

}