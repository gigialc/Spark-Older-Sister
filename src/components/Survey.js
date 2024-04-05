import styles from "./styles/Survey.module.css";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "./Button";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import NaviBar from './NavigationBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {Paper} from '@mui/material'
import { getFirestore } from "firebase/firestore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';
import Checkbox from '@mui/material/Checkbox';

function Survey() {
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
        sx={{
          backgroundColor: clicked ? "light-grey" : "white",
          color: clicked ? "black" : "black",
          margin: 1
        }}
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
      
      <NaviBar />
      <div className={styles.dboard} >
        <div className={styles.welcome}>
          <Paper elevation={0} sx={{width:"100%"}} >
          <Tabs value={email} aria-label="nav tabs example" orientation="vertical" sx={{display: 'flex', justifyContent: 'flex-start', backgroundColor:"#f2f2f2"}}>
            <br></br>
            <br></br>
            <LinkTab icon={<AccountCircleIcon />} iconPosition="start"label="Account Management" href="/profile" />
            <LinkTab icon={<DashboardCustomizeIcon />} iconPosition="start" label="Coin Shop" href="/profile" />
            <LinkTab icon={<DashboardCustomizeIcon />} iconPosition="start" label="Edit Topics" href="/survey" />
            <LinkTab icon={<FavoriteIcon />} iconPosition="start" label="Bookmarks" href="/liked" />
            <LinkTab icon={<ArticleIcon />} iconPosition="start" label="Accessibility" href="/profile" />
            <LinkTab icon={<ArticleIcon />} iconPosition="start" label="Notifications" href="/profile" />
            <LinkTab icon={<ArticleIcon />} iconPosition="start" label="Privacy" href="/profile" />
            
            {/* <br></br> */}
            <LinkTab icon={<LogoutIcon />} iconPosition="start" label="Logout" href="/register" sx={{position: "relative",  justifyContent: 'flex-start'}}/>
          </Tabs>
        </Paper>
        </div>


        <Paper  className={styles.articlePaper} elevation={0} sx={{ backgroundColor: '#f2f2f2' }}>
          
        <main className={styles.survey}>
      <div>
            <h1 className = {styles.title}>Edit Topics</h1>
      
      <p className={styles.message}>Customize your article feed</p>
      
      <div style={SurveyButton.containerStyle} className={styles.chipContainer}>
      
        <StyledChip className= {styles.chips}
          label="Reproductive Health"
          onClick={() => handleTopicClick("Reproductivehealth","https://www.theskimm.com/wellness/why-is-my-period-blood-brown")}
          clicked={selectedTopics.includes("Reproductivehealth")}
        />
        <StyledChip 
          label="Breast Health"
          onClick={() => handleTopicClick("Breasthealth","https://www.healthline.com/health/womens-health/why-does-my-breast-hurt-when-i-press-it")}
          clicked={selectedTopics.includes("Breasthealth")}
        />
        <StyledChip
          label="Mental Health"
          onClick={() => handleTopicClick("Mentalhealth","https://www.berkeleywellbeing.com/feeling-sad.html")}
          clicked={selectedTopics.includes("Mentalhealth")}
        />
        <StyledChip
          label="Cardiovascular Health"
          onClick={() => handleTopicClick("Cardiovascularhealth", "https://www.mayoclinic.org/diseases-conditions/heart-palpitations/symptoms-causes/syc-20373196")}
          clicked={selectedTopics.includes("Cardiovascularhealth")}
        />
        <StyledChip
          label="Bone Health"
          onClick={() => handleTopicClick("Bonehealth","https://www.healthline.com/health/bone-health/why-do-my-bones-crack-so-much")}
          clicked={selectedTopics.includes("Bonehealth")}
        />
        <StyledChip
          label="Cancer"
          onClick={() => handleTopicClick("Cancer","https://www.cancerresearchuk.org/about-cancer/causes-of-cancer/can-cancer-be-prevented-0")}
          clicked={selectedTopics.includes("Cancer")}
        />
        <StyledChip
          label="Autoimmune Diseases"
          onClick={() => handleTopicClick("Autoimmunediseases","https://www.healthline.com/health/autoimmune-disorders")}
          clicked={selectedTopics.includes("Autoimmunediseases")}
        />
        <StyledChip
          label="Skin Health"
          onClick={() => handleTopicClick("Skinhealth","https://share.upmc.com/2018/04/dry-flaky-skin-on-face/")}
          clicked={selectedTopics.includes("Skinhealth")}
        />
                <StyledChip
          label="Muscular Health"
          onClick={() => handleTopicClick("Muscularhealth","https://my.clevelandclinic.org/health/symptoms/22274-calf-muscle-pain")}
          clicked={selectedTopics.includes("Muscularhealth")}
        />
                  <StyledChip
          label="Nutrition and Fitness"
          onClick={() => handleTopicClick("Nutritionandfitness","https://www.ndtv.com/health/weight-loss-diet-essential-nutrients-you-need-for-losing-weight-quickly-2098994")}
          clicked={selectedTopics.includes("Nutritionandfitness")}
        />
      </div>
        <Button component={Link}  color="primary" onClick={handleSubmit} className={styles.submit} 
        sx=
        {{ 
          display: "block", 
          width: "fit-content", 
          backgroundColor: '#ffab2d',   //its just transparent now, TBF
          color: 'white', 
          borderRadius: "20px",
          padding: "6px 12px",
          fontWeight: "bold",
          fontSize: "25px",
          marginTop: '10px',
          left: '200px',
          }}>
        Submit
        </Button>
     
      </div>
    </main>



        </Paper>

      </div>
  </main>
  );
}







export default Survey;

