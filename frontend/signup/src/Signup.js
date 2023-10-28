import React from "react";
import './index.css';

const Signup = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.success) {
                window.location.href = "/login";
            }
        })
    }

    return (
        <div className="signup">
            <h3 className="title">Sign Up</h3>
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="control">
                            <input className="input is-large" type="email" name="email" placeholder="Email"
                                   autoFocus=""/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className="input is-large" type="text" name="name" placeholder="Name" autoFocus=""/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className="input is-large" type="password" name="password" placeholder="Password"/>
                        </div>
                    </div>
                    <button className="button is-block is-info is-large is-fullwidth">Sign Up</button>
                </form>
                <a className="login" href="/login">Login</a>
            </div>
        </div>
    );
};

export default Signup;