import { db } from "../firebase";
import { doc, collection, where, query, getDocs, limit, getFirestore, getDoc } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import Article from './article';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import styles from "./styles/Dashboard.module.css";
import Insights from './scripts/insights';
import NaviBar from "./NavigationBar";
import AddIcon from '@mui/icons-material/Add';

const Styled2Paper = styled(Paper)(({ theme }) => ({
  display: 'relative',
  width: '90%',
  height: '99%',
  borderRadius: '10px',
  margin: theme.spacing(1),
  boxShadow: 'none',
  backgroundColor: '#f5f5f5'

}));

const Paper2 = styled(Paper)(({ theme }) => ({
  display: 'relative',
  width: '100%',
  height: 'auto',
  marginTop: '-5%',
  boxShadow: 'none',
  backgroundColor: '#f5f5f5'
  
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  color: 'black',
  fontSize: '35px'
}));

function Dashboard() {
  const auth = getAuth();
  const firestore = getFirestore();
  const [email, setEmail] = useState(null);
  const [topics, setTopics] = useState([]);
  const [links, setLinks] = useState([]);
  const [fullContent, setFullContent] = useState([]);
  const [id, setId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [quote, setQuote] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setEmail(user.email);
        setUsername(user.username);
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setTopics(userDoc.data().topics);
          setLinks(userDoc.data().links);
        } else {
          setTopics([]);
          setLinks([]);
        }
      } else {
        setEmail(null);
        setTopics(null);
        setLinks(null);
      }
      return unsubscribe;
    });

    //get the user username
    const userRef = doc(db, "users", auth.currentUser.uid);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        setUsername(doc.data().username);
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });


    const fetchArticles = async () => {
      const newContent = [];
      for (const link of links) {
        try {
          const q = query(collection(db, "articles"), where("url", "==", link), limit(1));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const article = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().url,
              content: doc.data().content,
              userLikes: [],
              likes: doc.data().userLikes.length,
              topics: doc.data().topic,
            };
            newContent.push(article);
          });
        } catch (error) {
          console.error(`Error fetching articles for ${link}`, error);
        }
      }
      setFullContent(newContent);
    };
    const getWelcomeData = async () => {
      const collectionRef = collection(db, "welcome");
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const random = Math.floor(Math.random() * (data.length - 1));
      setId(data[random].id);
      setImageUrl(data[random].imageUrl);
      setQuote(data[random].quote);
    };
    if (id == null) {
      getWelcomeData();
    } else {
      fetchArticles();
    }
  }, [topics]);

  return (
    <main>
      <NaviBar />
      <div className={styles.dboard}>
        <div className={styles.welcome}>
          <CustomTypography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { fontSize: 20 } }}
          >
            Welcome{'\n'}{email} 🧡
          </CustomTypography>
          <p className={styles.welcomeText}>What do you want to learn today?</p>
          <br />

          {/* <Insights /> */}
          <Paper2>
            <Typography variant="subtext">
              <div id={id}>
                <div className={styles.quoteImagePos}> 
                  <img className={styles.quoteImage} src={imageUrl} alt="Motivating women's health" />
                </div>
                <div className={styles.quotes}> {quote} </div>
              </div>
            </Typography>
          </Paper2>
        </div>
        <div className={styles.insights}>
          <Paper elevation={10}></Paper>
        </div>
        <Styled2Paper className={styles.articlePaper} elevation={15}>
          <div className={styles.articleGrid}>
            {fullContent && fullContent.map((topic) => (
              <Article
                key={topic.id}
                id={topic.id}
                title={topic.title}
                description={topic.description}
                content={topic.content}
                userLikes={topic.userLikes}
                likes={topic.likes}
                topic={topic.topics}
                width={2/9}
              />
            ))}
          </div>
        </Styled2Paper>
        {/* <a href="/contributor">
          <button className={styles.contributorBtn}><AddIcon fontSize="large" sx={{color:"white"}} /></button>
        </a> */}
      </div>
    </main>
  );
}

export default Dashboard;
