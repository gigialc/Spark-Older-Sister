import React from "react";
import styles from "./styles/welcome.module.css";
import logo from './logo.png'; 
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Welcome() {
    const [email, setEmail] = useState("");

    const register = () => {
        window.location.href = "/register";
    };

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  };

  const handleEmailSubmit = async () => {
      if (email) {
          try {
              await addDoc(collection(db, "waitlist"), { email });
              alert("Thank you for joining the waitlist!");
              setEmail(""); // Clear the input field
          } catch (error) {
              console.error("Error adding document: ", error);
              alert("There was an error. Please try again.");
          }
      } else {
          alert("Please enter a valid email address.");
      }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img  src={logo} alt="Older Sister Logo" className={styles.logoImage} />
        <h1 className={styles.logoText}>Older Sister</h1>
      </div>
      <div className={styles.taglines}>
        <span className={styles.tagline}>BEAUTY</span>
        <span className={styles.tagline}>SELF-CARE</span>
        <span className={styles.tagline}>AI-PERSONALIZED</span>
      </div>
      <div className={styles.mainText}>
        <h2>Women's Healthcare Information</h2>
        <h3>shouldn't be hard to find.</h3>
      </div>
      <div className={styles.subText}>
        <h4>That’s why we put it all in one place.</h4>
      </div>
      {/* <div className={styles.buttonContainer}>
        <button className={styles.findOutMoreButton} onClick={register}>FIND OUT MORE</button>
      </div> */}

      <div className={styles.emailContainer}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={styles.emailInput}
                />
                <button
                    className={styles.submitButton}
                    onClick={handleEmailSubmit}
                >
                    JOIN WAITLIST
                </button>
            </div>

    </div>
  );
}

export default Welcome;
