import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import auth from "./FirebaseConfig.js";
import { Navigate } from "react-router-dom";


const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch(error) {
            alert("メールアドレスまたはパスワードが間違っています");
        }
    };

    const [user, setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    });

    return(
        <>
        {user ? (
            <Navigate to={`/`} />
        ) : (
            <div className="panel">
                <div className="panel-heading">ログイン</div>
                <form>
                    <div className='panel-block'>
                        <label>メールアドレス</label>
                        <input 
                            name='email' 
                            type="email" 
                            className='input'
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className='panel-block'>
                        <label>パスワード</label>
                        <input 
                            name='password' 
                            type="password" 
                            className='input'
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <button className='button is-info' onSubmit={handleSubmit}>ログイン</button>
                    <p>アカウントがない場合は<Navigate to={`/login`}>こちら</Navigate></p>
                </form>
        </div>
        )}
      </>
    );
};

const root = document.getElementById('root');
ReactDOM.render(<Login />, root);
export default Login;