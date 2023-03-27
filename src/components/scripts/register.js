import styles from "../styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getUserByEmail } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, arrayUnion, getDoc } from "firebase/firestore"; 
function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
      
        const auth = getAuth();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          const userRef = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(userRef);
          console.log(docSnap.data())
          if (docSnap.exists() && docSnap.data().topics) {
            navigate("/dashboard");
          } else {
            navigate("/survey");
          }
        } catch (error) {
          alert(error.message);
        }
      };
      
    const createAccount = e => {
        e.preventDefault();
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
            if (auth) {
                navigate("/");
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className = {styles.sheesh}>
             <h1 className = {styles.logo}>STAKE THE STIGMA.</h1>
             <h2 className={styles.logo2}>_UNCENSORING CENSORED NEWS_</h2>
        
        <section className = {styles.layout}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "25vh", marginLeft: "100px" }}>
                <form>
                    <div className = {styles.emailInput}>
                        <h4 className= {styles.logo3}> Email</h4>
                        <input type = "text" value = {email} onChange = {e => {setEmail(e.target.value)}} className = {styles.email}/>
                    </div>
                    <div className = {styles.passwordInput}>
                        <h4 className= {styles.logo3}> Password</h4>
                        <input type = "password" value = {password} onChange = {e => {setPassword(e.target.value)}} className = {styles.password} />
                    </div>

                    <button type = "submit" onClick = {signIn} className = {styles.signInBtn}>
                        <Link to = {"/dashboard"} color= "inherit" style={{textDecoration:'none'}}>
                            Sign In
                        </Link>
                    </button>
                </form>

                <p className = {styles.message}>Don't have an account? Create one here!</p>
                <button className = {styles.createAccBtn} onClick = {createAccount}>Create your account</button>
            </div>
        </section>
        </div>
        
    );
}

export default Register;