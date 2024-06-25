import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from "./styles/createAccount.module.css";
import logo from "./OlderSistersvg.svg"

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState(""); // State for handling errors
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const firestore = getFirestore(); // Initialize Firestore// Reference to the user's document in Firestore

        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            if (authUser) {
                // Save additional user information to Firestore
                const userRef = doc(firestore, "users", auth.currentUser.uid); 
                setDoc(userRef, { email: auth.currentUser.email,  
                    username: username,
                    city: city,
                    age: age             
                }, { merge: true })
                navigate("/topics");
            }
        } catch (error) {
            setError(error.message); // Set error state
        }
    };

    return (
        <div className={styles.container}>
            <br />
            <br />
            <div className={styles.logo}>
                <img src={logo} alt="Older Sister Logo" className={styles.logoImage} />
                {/* <h1>Older Sister</h1> */}
            </div>
            <div className={styles.welcome}>
                <h2>Create Account!</h2>
            </div>
            <br />
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleCreateAccount}>
                    <div className={styles.formGroup}>
                        <TextField size="small"
                                   label="Enter Username"
                                   variant="outlined"
                                   required
                                   onChange={handleUsernameChange}
                                   className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <TextField size="small"
                                   label="Enter City"
                                   variant="outlined"
                                   required
                                   onChange={handleCityChange}
                                   className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <TextField size="small"
                                   label="Enter Age"
                                   variant="outlined"
                                   required
                                   onChange={handleAgeChange}
                                   className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <TextField size="small"
                                   label="Enter Username/Email"
                                   variant="outlined"
                                   required
                                   onChange={handleEmailChange}
                                   className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <TextField size="small"
                                   label="Enter Password"
                                   variant="outlined"
                                   type="password"
                                   required
                                   onChange={handlePasswordChange}
                                   className={styles.inputField}
                        />
                    </div>
                    <br />
                    <button type="submit" onClick={handleCreateAccount} className={styles.signInBtn}>
                        Create Account
                    </button>
                    <div className={styles.errorContainer}>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;

