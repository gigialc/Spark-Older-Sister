import React, { useState } from 'react';
import registerStyles from './styles/Register.module.css';
import loginStyles from './styles/Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import styles from "./styles/Register.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const signIn = e => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(auth => {
                navigate("/Dashboard");
            })
            .catch(error => alert(error.message))
    }

    const createAccount = e => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                if (auth) {
                    navigate("/dashboard");
                }
            })
            .catch(error => alert(error.message))
    }

    const inputStyle = {
        width: '100%', 
        marginBottom: '20px',
    };

    return (
        <div>
            <main className={loginStyles.buttonContainer}>
                <h1 className={loginStyles.logo}>Older Sister.</h1>
                <h2 className={loginStyles.logo2}>Your reproductive health journal</h2>
                <div className={loginStyles.buttonWrapper}>
                    <button className={loginStyles.login}>
                        <Link to={"/"} style={{ textDecoration: 'none', color: '#954441' }}>
                            Back to Home
                        </Link>
                    </button>
                </div>
            </main>
            <div className={registerStyles.container}>
                <div className={registerStyles.logo2}>
                    <h1>Older Sister.</h1>
                </div>
                <div className={registerStyles.right}>
                    <form>
                    <div style={{"padding-top":"40px"}}>
                        <TextField size="small"
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                    required
                                    onChange = {e => {setEmail(e.target.value)}}
                                    sx={inputStyle}
                                     />
                    </div>
                    <div style={{"padding-top":"40px"}}>
                        <TextField size="small"
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    required
                                    onChange = {e => {setPassword(e.target.value)}}
                                     />
                    </div>
                    <div className = {styles.passwordInput}>
                        {/* <h4 className= {styles.logo3}> Password</h4> */}
                        <input type = "password" value = {password} onChange = {e => {setPassword(e.target.value)}} className = {styles.password} />
                    </div>

                    <button type = "submit" onClick = {signIn} className = {styles.signInBtn}>Sign In</button>
                    </form>
                    <p>Don't have an account? Create one here!</p>
                <button className={styles.registerButton} onClick={createAccount}>Create an account</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
