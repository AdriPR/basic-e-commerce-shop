import React from "react";
import './index.css';

const Login = () => {

    // handleSubmit to submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            console.log(data);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('user_email', data.user_email);
            localStorage.setItem('user_name', data.user_name);
            if (localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined
                && localStorage.getItem('refresh_token') !== null && localStorage.getItem('refresh_token') !== undefined
                && localStorage.getItem('user_email') !== null && localStorage.getItem('user_email') !== undefined
                && localStorage.getItem('user_name') !== null && localStorage.getItem('user_name') !== undefined) {
                window.location.href = "/";
            }
        })
    }

    return (
        <div className="login">
            <h3 className="title">Login</h3>
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="control">
                            <input className="input is-large" type="email" name="email" placeholder="Your Email"
                                   autoFocus=""/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className="input is-large" type="password" name="password"
                                   placeholder="Your Password"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="checkbox">
                            <input type="checkbox"/>
                            Remember me
                        </label>
                    </div>
                    <button className="button">Login</button>
                </form>
                <a className="signup" href="/signup">Signup</a>
            </div>
        </div>
    );
};

export default Login;