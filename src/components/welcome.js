import React from "react";
import styles from "./styles/welcome.module.css";
import logo from './logo.png'; 

function Welcome() {
    const register = () => {
        window.location.href = "/register";
    };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img  src={logo} alt="Older Sister Logo" className={styles.logoImage} />
        <h1 className={styles.logoText}>Older Sister</h1>
      </div>
      <div className={styles.taglines}>
        <span className={styles.tagline}>RELIABLE</span>
        <span className={styles.tagline}>FACT CHECKED</span>
        <span className={styles.tagline}>AI-PERSONALIZED</span>
      </div>
      <div className={styles.mainText}>
        <h2>Women's Healthcare Information</h2>
        <h3>shouldn't be hard to find.</h3>
      </div>
      <div className={styles.subText}>
        <h4>That’s why we put it all in one place.</h4>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.findOutMoreButton} onClick={register}>FIND OUT MORE</button>
      </div>
    </div>
  );
}

export default Welcome;
