import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    if(req.method !== 'POST') return res.status(405).end();

    const {email, password} = req.body;
    const checkUser = await db('users').where({email}).first();

    if(!checkUser) return res.status(401).end(); //unauthorized

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    //console.log(checkPassword);

    if(!checkPassword) return res.status(401).end();

    const token = jwt.sign({
        id : checkUser.id,
        email : checkUser.email
    }, 'yourmom', {
        expiresIn: '7d'
    });

    res.status(200);
    res.json({
        message : 'Logged In',
        token
    });
}