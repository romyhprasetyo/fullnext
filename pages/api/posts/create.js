import db from '../../../libs/db';

export default async function handler(req, res){

    //console.log(req.method);
    if(req.method!== 'POST') return res.status(405).end();

    //console.log(req.body)
    const {title, content} = req.body;

    const create = await db('posts').insert({
        title,
        content
    });

    const createdData = await db('posts').where('id', create).first()

    res.status(200);
    res.json({
        message: 'Post created successfully',
        data : createdData
    })
}