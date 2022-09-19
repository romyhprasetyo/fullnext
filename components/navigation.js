import Link from 'next/link';
import React from "react";
import Cookie from "js-cookie";
import Router from 'next/router';

export default function Navigation(){
    async function logoutHandler(e){
        e.preventDefault();
        const ask = await confirm('Are your sure?');
        if(ask === true){
            Cookie.remove('token');
            //to avoid cache -> use replace instead of push
            return Router.replace('/auth/login');
        }
    }
    return(
        //jsx fragment
        <>
            <Link href="/posts">
                <a>Posts</a>
            </Link> |&nbsp;
            <Link href="/posts/create">
                <a>Create Post</a>
            </Link> |&nbsp;
            <button onClick={logoutHandler.bind(this)}>Logout</button>
            <br/><br/>
        </>
    );
}