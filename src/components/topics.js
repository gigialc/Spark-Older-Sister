import styles from "./styles/Topics.module.css";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "./Button";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Tab from '@mui/material/Tab';
import {Paper} from '@mui/material'
import { getFirestore } from "firebase/firestore";
import Checkbox from '@mui/material/Checkbox';
import footerImage from './footer-image.png';

function Topics() {
  const auth = getAuth();
    const firestore = getFirestore();
    // navigate is used to go to search page while passing parameters
    // logged in user's email. Can be used later
    const [email, setEmail] = useState(null)

    // a user's topics and links to iterate over
    const [topics, setTopics] = useState([])
    const [links, setLinks] = useState([])

    // Defining our variables that we will use for this page
    const [urlList, setUrl] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const navigate = useNavigate();

  // Sets an array that is updated when a user selecets/deselects a topic button
  function handleTopicClick(topic, link) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
      setUrl(urlList.filter((t) => link !== link));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
      setUrl([...urlList, link]);

    }
  }

  // On submit, we set the user's topics field in firebase to be the topics that they chose
  const handleSubmit = async (event) => {
    const auth = getAuth();
    if (auth.currentUser) {
      // add topics to user's thing
      // Send API call to Firebase with selectedTopics array
      // Example API call using fetch:
      event.preventDefault();
      const userRef = doc(db, "users", auth.currentUser.uid);
      console.log(urlList)
      // Add topics array to user profile in Firestore
      setDoc(userRef, { email: auth.currentUser.email, topics: selectedTopics, links: urlList }, { merge: true })
        .then(() => {
          navigate("/dashboard", { state: { uuid: auth.currentUser.uid} });
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      // If the user is not authenticated, prompt them to log in
      alert("Please log in to add articles.");
      navigate("/login");
    }
  };
       
    const handleSkip = async (event) => {
        navigate("/dashboard", { state: { uuid: auth.currentUser.uid} });
    }

  function StyledChip(props) {
    const { clicked, ...rest } = props;
    const [click, setClicked] = useState(false);


  const handleClick = () => {
    setClicked(!clicked);
  };

    return (

      <Chip
        {...rest}
        avatar={<Checkbox checked={clicked} onChange={handleClick} />}
       
      />
    );
  }
  
  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          navigate(props.href)
        }}
        sx={{
          justifyContent: 'flex-start',
          margin: '-5px',
        }}
        {...props}
      />
    );
  }

  return (
    <main > 
      <div className={styles.dboard} >
        <Paper  className={styles.articlePaper} elevation={0} sx={{ backgroundColor: '#f2f2f2' }}>
           <main className={styles.survey}>
        <div>
        <h1 className = {styles.title}>What do you want to learn about?</h1>
      
        <p className={styles.message}>Customize your article feed</p>

        <div style={SurveyButton.containerStyle} className={styles.chipContainer}>
      
        <StyledChip className= {styles.chips}
          label="Reproductive Health"
          onClick={() => handleTopicClick("Reproductivehealth","https://www.theskimm.com/wellness/why-is-my-period-blood-brown")}
          clicked={selectedTopics.includes("Reproductivehealth")}
        />
        <StyledChip  className= {styles.chips}
          label="Breast Health"
          onClick={() => handleTopicClick("Breasthealth","https://www.healthline.com/health/womens-health/why-does-my-breast-hurt-when-i-press-it")}
          clicked={selectedTopics.includes("Breasthealth")}
        />
        <StyledChip className= {styles.chips}
          label="Mental Health"
          onClick={() => handleTopicClick("Mentalhealth","https://www.berkeleywellbeing.com/feeling-sad.html")}
          clicked={selectedTopics.includes("Mentalhealth")}
        />
        <StyledChip className= {styles.chips}
          label="Cardiovascular Health"
          onClick={() => handleTopicClick("Cardiovascularhealth", "https://www.mayoclinic.org/diseases-conditions/heart-palpitations/symptoms-causes/syc-20373196")}
          clicked={selectedTopics.includes("Cardiovascularhealth")}
        />
        <StyledChip className= {styles.chips}
          label="Bone Health"
          onClick={() => handleTopicClick("Bonehealth","https://www.healthline.com/health/bone-health/why-do-my-bones-crack-so-much")}
          clicked={selectedTopics.includes("Bonehealth")}
        />
        <StyledChip className= {styles.chips}
          label="Cancer"
          onClick={() => handleTopicClick("Cancer","https://www.cancerresearchuk.org/about-cancer/causes-of-cancer/can-cancer-be-prevented-0")}
          clicked={selectedTopics.includes("Cancer")}
        />
        <StyledChip className= {styles.chips}
          label="Autoimmune Diseases"
          onClick={() => handleTopicClick("Autoimmunediseases","https://www.healthline.com/health/autoimmune-disorders")}
          clicked={selectedTopics.includes("Autoimmunediseases")}
        />
        <StyledChip className= {styles.chips}
          label="Skin Health"
          onClick={() => handleTopicClick("Skinhealth","https://share.upmc.com/2018/04/dry-flaky-skin-on-face/")}
          clicked={selectedTopics.includes("Skinhealth")}
        />
        <StyledChip className= {styles.chips}
          label="Muscular Health"
          onClick={() => handleTopicClick("Muscularhealth","https://my.clevelandclinic.org/health/symptoms/22274-calf-muscle-pain")}
          clicked={selectedTopics.includes("Muscularhealth")}
        />
        <StyledChip className= {styles.chips}
          label="Nutrition and Fitness"
          onClick={() => handleTopicClick("Nutritionandfitness","https://www.ndtv.com/health/weight-loss-diet-essential-nutrients-you-need-for-losing-weight-quickly-2098994")}
          clicked={selectedTopics.includes("Nutritionandfitness")}
        />
        </div>
        <Button component={Link}  color="primary" onClick={handleSubmit}
        sx=
        {{ 
          display: "block", 
          width: "fit-content", 
          backgroundColor: 'fuchsia',
          color: 'white', 
          borderRadius: "20px",
          padding: "6px 12px",
          fontWeight: "bold",
          fontSize: "20px",
          marginTop: '30px',
          marginLeft: 'auto',
          marginRight: 'auto',

        }}>
        Submit
        </Button>

        <Button component={Link}  color="primary" onClick={handleSkip} className={styles.skip}
        sx=
        {{ 
        //   display: "block", 
        //   width: "fit-content", 
        //   backgroundColor: '#D4473B',
        //   color: 'white', 
        //   borderRadius: "20px",
        //   padding: "6px 12px",
        //   fontWeight: "bold",
        //   fontSize: "20px",
        // //   marginTop: '10px',
        // //   marginLeft: '10px',
        }}>
        Skip
        </Button>
     
        </div>
        </main>
        
        </Paper>
        <img src={footerImage} alt="Footer" className={styles.footerImage} />
      </div>
  </main>
  );
}

export default Topics;
