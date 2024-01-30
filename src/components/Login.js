import styles from "./styles/Login.module.css"; 
import { Link } from "react-router-dom";
import * as React from 'react';

function Login() {
    
    return (
        <main className={styles.buttonContainer}>
            <h1 className={styles.logo}>Older Sister.</h1>
            <h2 className={styles.logo2}>Your reproductive health jounral</h2>
            <div className={styles.buttonWrapper}>
                <button className={styles.login}>
                    <Link to={"/register"} style={{textDecoration:'none', color: '#954441'}}>
                        Register/Login
                    </Link>
                </button>
            </div>
        </main>
    );
}

export default Login;