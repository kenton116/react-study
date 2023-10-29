import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import auth from "./FirebaseConfig.js";
import { Navigate } from "react-router-dom";

const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch(error) {
            alert("正しく入力してください");
        }
    }

    const [user, setUser] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    },[]);

    return(
        <>
        {user ? (
            <Navigate to={`/`} />
        ) : (
            <div className="panel">
                <div className="panel-heading">アカウントを作成</div>
                <form onSubmit={handleSubmit}>
                    <div className='panel-block'>
                        <label>メールアドレス</label>
                        <input
                            name='email'
                            type="email"
                            className='input'
                            value={registerEmail} 
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                    </div>
                    <div className='panel-block'>
                        <label>パスワード</label>
                        <input
                            name='password' 
                            type="password" 
                            className='input'
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                    </div>
                    <button className='button is-info' onClick={handleSubmit}>登録</button>
                    <p>すでにアカウントがある場合は<Navigate to={`/login`}>こちら</Navigate></p>
                </form>
          </div>
        )};
        </>
    )
};

const root = document.getElementById('root');
ReactDOM.render(<Register />, root);
export default Register;