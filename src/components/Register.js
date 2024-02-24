import styles from "./styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';

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
                navigate("/dashboard");
            })
            .catch(error => alert(error.message))
    }

    const createAccount = e => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                if (auth) {
                    navigate("/");
                }
            })
            .catch(error => setError(error.message)); // Set error state
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo2}>
                <h1>Older Sister.</h1>
            </div>
            <div className={styles.right}>
                <form>
                <div style={{ paddingTop: "20px" }}> {/* Adjust paddingTop as needed */}
                <TextField size="small"
                                label="Email"
                                variant="outlined"
                                required
                                onChange={e => setEmail(e.target.value)}
                                style={{ width: '100%', marginBottom: '10px' }} // Reduced marginBottom
                        />
                    </div>
                    <div>
                <TextField size="small"
                                label="Password"
                                variant="outlined"
                                required
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                style={{ width: '100%', marginBottom: '20px' }} // Adjust marginBottom as needed
                        />
                    </div>
                    <button type="submit" onClick={signIn} className={styles.signInBtn}>
                        Sign In
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <p>Don't have an account? Create one here!</p>
                <button className={styles.registerButton} onClick={createAccount}>
                    Create an account
                </button>
            </div>
        </div>
    );
}

export default Register;
