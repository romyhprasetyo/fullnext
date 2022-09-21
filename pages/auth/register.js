import React, {useState} from 'react';
import {unauthPage} from '../../middlewares/authorizationPage';
import Link from "next/link";

export async function getServerSideProps(ctx){
    await unauthPage(ctx);
    return{
        props : {}
    }
}

export default function Register(){
    //getter + setter / state management
    const [fields,setField] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('normal');

    async function registerHandler(e) {
        e.preventDefault();

        setStatus('loading');

        const registerReq = await fetch('/api/auth/register',{
            method : 'POST',
            body : JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            } //body parsers are needed in next js
        });
        const registerRes = await registerReq.json();
        if(!registerReq.ok) return setStatus('error'+ registerReq.status);

        setStatus('success');

        //console.log(registerRes);
        //console.log(fields);
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name');
        setField({
            ...fields,
            [name] : e.target.value
        })
        //console.log(e.target.value);
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={registerHandler.bind(this)}>
                <input
                    onChange={fieldHandler.bind(this)}
                    name="email"
                    type="text"
                    placeholder="Email"/><br/>
                <input
                    onChange={fieldHandler.bind(this)}
                    name="password"
                    type="password"
                    placeholder="Password"/>
                <br/>
                <button type="submit">Register</button>
                <div>
                    Output : {status}
                </div>
                <br/>
                <Link href="/auth/login"><a>Login</a></Link>
            </form>
        </div>
    );
}