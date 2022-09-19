import React,{useState} from 'react';
import {authPage} from '../../middlewares/authorizationPage';
import Router from 'next/router';

export async function getServerSideProps(ctx){
    const {token} = await authPage(ctx);
    return{
        props : {
            token
        }
    }
}

export default function PostCreate(props){
    const [fields, setFields] = useState({
        title : '',
        content : ''
    });

    const [status, setStatus] = useState('normal');


    async function createHandler(e){
        e.preventDefault();

        setStatus('Loading');

        const {token} = props;
        const create = await fetch('/api/posts/create', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        const res = await create.json();
        //if(!res.ok) return setStatus('error'+ res.status)

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
            <h1>Create a Post</h1>
            <form onSubmit={createHandler.bind(this)}>
                <input
                    onChange={fieldHanlder.bind(this)}
                    type="text"
                    name="title"
                    placeholder="Post Title"
                /> <br/>
                <textarea
                    onChange={fieldHanlder.bind(this)}
                    name="content"
                    placeholder="Post Content"
                    cols="30"
                    rows="10"></textarea>
                <br/>
                <button type="submit">CreatePost</button>
                <div>
                    Status : {status}
                </div>
            </form>
        </div>
    )
}