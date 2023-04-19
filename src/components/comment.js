import styles from "../../src/components/styles/Comment.module.css";
import { getAuth } from "firebase/auth";
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import { doc, FieldValue, setDoc, updateDoc, collection, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

function Comment(props) {
    // Defining variables used within this file
    const docRef = doc(db, "articles", props.id );
    const auth = getAuth();
    const currentUser = auth.currentUser.email;
    const [comment, setComment] = useState("");
    const [responses, setResponses] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [cx, setCx] = useState();
    
    useEffect(()=>{
        async function fetchResources() {
            const docSnap = await getDoc(docRef);
            if (docSnap.data().responses) {
                setResponses(docSnap.data().responses)
            } 
        }
        fetchResources()
    },[])
    // When a comment is submitted we'll push it to firebase
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (comment.trim() === '') {
            setIsEmpty(true);
            return;
        }
        // Get a reference to the document to update
        const docRef = doc(db, "articles", props.id);
        // Set the updated data for the document
        setResponses([...responses, { user: currentUser, response: comment }])
        setDoc(docRef, {
            responses: arrayUnion({ user: currentUser, response: comment })
        }, { merge: true });
        // setResponses([...responses, { user: currentUser, response: comment }]);
        // Clear the comment input
        setIsEmpty(false);
        setComment("");
    };

    // useEffect(() => {
    //     // Get a reference to the document to update
    //     const docRef = doc(db, "articles", props.id);
    //     // Set the updated data for the document
    //     console.log(responses)
    //     setDoc(docRef, {
    //         responses: responses
    //     }, { merge: true });
    //   }, [responses]);

    // Clears all the repsonses 
    const clearResponses = () => {
        setResponses([]);
    }

    return(
        <section>
            <h1 className= {styles.title}> Comments </h1>
            <div className = {styles.responses}>
            {responses?responses.map((response) => <p><span>{response.user}</span>: {response.response}</p>): <h1>hi</h1>}
            </div>
            <div className = {styles.formWrapper}>
                <form onSubmit={handleSubmit} className= {styles.comment}>
                    <textarea 
                        placeholder = "Leave a comment..." 
                        id="comment" 
                        value={comment} 
                        onChange={(e) => {setComment(e.target.value);
                                          setIsEmpty(false)}} />
                    <button type="submit"><SendIcon /></button>
                    {isEmpty && <p>Please enter a valid response</p>}
                </form>
            </div>
        </section>
    );
}

export default Comment;