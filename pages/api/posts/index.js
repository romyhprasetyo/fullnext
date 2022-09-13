import db from '../../../libs/db'
import authorization from '../../../middlewares/authorization';

export default async function handler(req, res){
    if(req.method !== 'GET') return res.status(405).end();
    const posts = await db('posts');

    const auth = await authorization(req, res);

    res.status(200);
    res.json({
        message : 'Posts Data',
        data : posts
    })
}