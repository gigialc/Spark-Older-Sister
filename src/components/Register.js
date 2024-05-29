import React from "react";
import styles from "./styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';
import logo from "./logo.png";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for handling errors
    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(auth => {
                navigate("/survey");
            })
            .catch(error => setError(error.message)); // Set error state
    }

    const createAccount = e => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(auth => {
                if (auth) {
                    navigate("/");
                }
            })
            .catch(error => setError(error.message)); // Set error state
    };

    const forgotPassword = e => {
        e.preventDefault();
        const auth = getAuth();
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email sent!");
            })
           .catch(error => setError(error.message)); // Set error state
    }


    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="Older Sister Logo" className={styles.logoImage} />
                <h1>Older Sister</h1>
            </div>
            <div className={styles.welcome}>
                <h2>Welcome!</h2>
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <TextField size="small"
                                   label="Enter Username/Email"
                                   variant="outlined"
                                   required
                                   onChange={e => setEmail(e.target.value)}
                                   className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <TextField size="small"
                                   label="Enter Password"
                                   variant="outlined"
                                   required
                                   type="password"
                                   onChange={e => setPassword(e.target.value)}
                                   className={styles.inputField}
                        />
                    </div>
                    <a href="#" className={styles.forgotPassword} onClick={forgotPassword}>Forgot Password?</a>
                    <button type="submit" onClick={signIn} className={styles.signInBtn}>
                        LOG IN
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.noAccount}>No Account? <a href="#" onClick={createAccount} className={styles.signUp}>Create Account</a></p>
                <button className={`${styles.socialButton} ${styles.googleButton}`}>
                    {/* <img src="google-icon.png" alt="Google Icon" className={styles.icon} /> */}
                    Login with Google
                </button>
                <button className={`${styles.socialButton} ${styles.appleButton}`}>
                    {/* <img src="apple-icon.png" alt="Apple Icon" className={styles.icon} /> */}
                    Log in with Apple
                </button>
            </div>
        </div>
    );
}

export default Register;


