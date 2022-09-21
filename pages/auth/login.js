import React, {useState, useEffect} from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import {unauthPage} from '../../middlewares/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(ctx){
    await unauthPage(ctx);

    return{
        props : {}
    }
}

export default function Login(){
    const [fields, setField] = useState({
        email : '',
        password: ''
    });
    const [status, setStatus] = useState('normal');

    async function loginHandler(e) {
        e.preventDefault();
        setStatus('loading');

        const loginReq = await fetch('/api/auth/login', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(fields),
        });

        if(!loginReq.ok) return setStatus('error'+ loginReq.status);
        const loginRes = await loginReq.json();

        setStatus('success');
        Cookie.set('token', loginRes.token);
        Router.push('/posts')
        //console.log(loginRes);
    }
    function fieldHandler(e) {
        const name = e.target.getAttribute('name');

        setField({
            ...fields,
            [name] : e.target.value
        });
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={loginHandler.bind(this)}>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    name="email"
                    placeholder="Email"
                /> <br/>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="password"
                    name="password"
                    placeholder="Password"
                /><br/>
                <button type="submit">Login</button>
                <div>
                    Output : {status}
                </div>
                <br/>
                <Link href="/auth/register"><a>Register</a></Link>
            </form>
        </div>
    );
}