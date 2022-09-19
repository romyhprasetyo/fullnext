import React,{useState} from 'react';
import {authPage} from '../../../middlewares/authorizationPage';
import Router from 'next/router';
import {server} from '../../../config';
import Navigation from '../../../components/navigation';

export async function getServerSideProps(ctx){
    const {token} = await authPage(ctx);
    const {id} = ctx.query;

    const postReq = await fetch(`${server}/api/posts/detail/`+ id, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })

    const res = await postReq.json();

    return{
        props : {
            token,
            post : res.data
        }
    }
}

export default function PostEdit(props){
    const {post} = props;

    const [fields, setFields] = useState({
        title : post.id,
        content : post.content
    });

    const [status, setStatus] = useState('normal');

    async function updateHandler(id, e){
        e.preventDefault();

        setStatus('Loading');

        const {token} = props;
        const update = await fetch('/api/posts/update/'+ id, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        const res = await update.json();

        if(!update.ok) return setStatus('error'+ res.status)


        setStatus('Success');
        Router.push('/posts');

    }

    function fieldHanlder(e){
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name] : e.target.value
        })
    }

    return(
        <div>
            <h1>Edit Post</h1>
            <Navigation/>
            <p>Post ID : {post.id}</p>
            <form onSubmit={updateHandler.bind(this, post.id)}>
                <input
                    onChange={fieldHanlder.bind(this)}
                    type="text"
                    name="title"
                    defaultValue={post.title}
                    placeholder="Post Title"
                /> <br/>
                <textarea
                    onChange={fieldHanlder.bind(this)}
                    name="content"
                    placeholder="Post Content"
                    cols="30"
                    defaultValue={post.content}
                    rows="10"></textarea>
                <br/>
                <button type="submit">Update Post</button>
                <div>
                    Status : {status}
                </div>
            </form>
        </div>
    )
}