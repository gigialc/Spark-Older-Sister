import styles from "./styles/Searchpage.module.css";
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
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from "react-router-dom";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      width: '100%',
      fontSize: '16px', 
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '40ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));

  const Search = styled('div')(({ theme }) => ({
   
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginTop: '350px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '25%',
      width: '50%',
    },
  }));


  const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius:'20px',
    marginTop: '20vh',
    justifyContent:'center',
    alignSelf: 'center',
    height: '70px',
  }));

function Searchpage() {
  const auth = getAuth();
    const firestore = getFirestore();

    const [searchInput, setSearchInput] = useState("")



  // Defining our variables that we will use for this page
  const [urlList, setUrl] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;  
  

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
          margin: 1,
          width: '180px'
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
  

  
 
  
  
  const handleSearch = (event) =>{
    event.preventDefault()
    console.log(searchInput)
    if(currentPath === '/search'){
        navigate('/search', { state:
            {query: searchInput}});
        window.location.reload()
    }else{
        navigate('/search', { state:
            {query: searchInput}});
    }
  }


  
  return (
    <main > 
      
      <NaviBar />
   
    <Paper  className={styles.articlePaper} elevation={0} sx={{ backgroundColor: '#f2f2f2', height: '100vh', overflow: 'hidden'}}>
        <Search>
                <StyledPaper component="form" onSubmit={handleSearch}>
                {/* <SearchIconWrapper sx={{backgroundColor: 'transparent'}}> */}
                <LinkTab icon={<SearchIcon />} iconPosition="start" href="/searchpage" sx={{color: "#781208"}} />
                {/* </SearchIconWrapper> */}
                <StyledInputBase
                    placeholder="Search Healthcare Question"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    sx={{backgroundColor: 'transparent', width: '90vw'}}
                />
                </StyledPaper>
        </Search>
        
        <div style={SurveyButton.containerStyle} className={styles.chipContainer}>
        
            <StyledChip 
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
        
 



    </Paper>

  </main>
  );
}







export default Searchpage;

