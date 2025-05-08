import { request, Request, response, Response, Router } from "express";
import { validateData } from "../../middleware/validationMiddleware.js";
import {
    createUsersSchema,
    usersTable,
    loginUsersSchema
} from "../../db/userSchema.js";
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js'
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';


interface User {
    email: string,
    password: string
}

const router = Router();

router.post('/register', validateData(createUsersSchema), async (req: Request, res: Response) => {
    try {
        const data = req.body.cleanBody;
        data.password = await bcrypt.hash(data.password, 10);
        const [user] = (await db.insert(usersTable).values(data).returning());
        const { password, ...safeUser } = user;
        res.status(201).json({ safeUser })
    } catch (err) {
        res.status(500).send({ "Error": err })
    }
});


router.post('/login', validateData(loginUsersSchema),async (req, res) => {
   try {
    const { email, password }: User = req.body.cleanBody;
    const [ user ] = await db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

    if(!user){
        res.status(401).json({error: 'Authentication failed'})
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect){
        res.status(401).json({error: 'Authentication failed'})
        return
    }
    //@ts-ignore
    delete user.password;

    const token = jwt.sign({
        userId: user.id, role: user.role
    }, 'your-secret',{ expiresIn: '30d'});

    res.cookie("Authorization", token, {
        httpOnly: true,        // ⛔ Prevents client-side JS access
        secure: false,          // 🔒 Use HTTPS in production
        sameSite: "strict",    // 🚫 CSRF protection
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      });

    res.status(201).json({ user});
   } catch (err) {
    res.status(500).send(err)
   }
});

export default router;