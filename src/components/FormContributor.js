import { useState } from 'react';
import { db } from "../firebase";
import { collection, addDoc, query, getDocs, where, limit } from "firebase/firestore";
import './styles/formComponent.css';
import { OpenAI } from './scripts/openAI';
import NaviBar from './NavigationBar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';

function FormComponent() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  function handleTopicClick(topic, link) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const q = query(collection(db, "articles"), where("url", "==", url), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        const content = await OpenAI(url);
        console.log(content);
        const docRef = await addDoc(collection(db, "communityPosts"), {
          title: title,
          url: url,
          topic: selectedTopics,
          content: content.text,
          likes: 0,
          userLikes: []
        });
        console.log('Document written with ID: ', docRef.id);
        // Reset the form
        setTitle('');
        setUrl('');
        setSelectedTopics([]);
      }
    } catch (error) {
      console.error(`Error fetching articles for ${url}`, error);
    }
  };

  return (
    <div className="form-component">
      <NaviBar className="heading" />
      <button onClick={() => navigate("/dashboard")} className="contributorBack">Back</button>
      <div className="overall">
        <div className="contributorIcon">
          <AccountCircleIcon sx={{ fontSize: 125, marginLeft: '2px', color: pink[500] }} />
        </div>
        <div className="content">
          <h1 className="contributeTitle">Contribute</h1>
          <form onSubmit={handleSubmit} className="form-total">
            <label className="surveyLabel">
              Title
              <input
                type="text"
                className="contributorInput"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </label>
            <label className="surveyLabel">
              URL
              <input
                type="text"
                className="contributorInput"
                onChange={(event) => setUrl(event.target.value)}
                value={url}
              />
            </label>
            <textarea
              placeholder="Type your mini blog..."
              className="contributorInput2"
            />
          </form>
          <div className="surveyLabel2">
            <h1>Topics</h1>
            <div className="topicbuttons">
              <StyledChip
                label="Menstruation"
                onClick={() => handleTopicClick("menstruation", "https://www.nhs.uk/conditions/period-pain/")}
                clicked={selectedTopics.includes("menstruation")}
              />
              <StyledChip
                label="HPV Vaccination"
                onClick={() => handleTopicClick("hpv", "https://www.cdc.gov/std/hpv/stdfact-hpv.htm")}
                clicked={selectedTopics.includes("hpv")}
              />
              <StyledChip
                label="Polycystic ovary syndrome (PCOS)"
                onClick={() => handleTopicClick("pcos", "https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/")}
                clicked={selectedTopics.includes("pcos")}
              />
              <StyledChip
                label="Pregnancy"
                onClick={() => handleTopicClick("pregnancy", "https://www.cdc.gov/pregnancy/index.html")}
                clicked={selectedTopics.includes("pregnancy")}
              />
              <StyledChip
                label="Ovarian and Cervical Cancer"
                onClick={() => handleTopicClick("ovarian_cancer", "https://www.nhs.uk/conditions/ovarian-cancer/")}
                clicked={selectedTopics.includes("ovarian_cancer")}
              />
              <StyledChip
                label="Postpartum Depression"
                onClick={() => handleTopicClick("postpartum", "https://www.mayoclinic.org/diseases-conditions/postpartum-depression/symptoms-causes/syc-20376617")}
                clicked={selectedTopics.includes("postpartum")}
              />
              <StyledChip
                label="Breast Cancer"
                onClick={() => handleTopicClick("breast_cancer", "https://www.cdc.gov/cancer/breast/basic_info/what-is-breast-cancer.htm")}
                clicked={selectedTopics.includes("breast_cancer")}
              />
              <StyledChip
                label="Menopause"
                onClick={() => handleTopicClick("menopause", "https://www.nia.nih.gov/health/what-menopause")}
                clicked={selectedTopics.includes("menopause")}
              />
            </div>
          </div>
          <Button
            className="submit"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: "200px",
              height: "50px",
              borderRadius: "999px",
              backgroundColor: "#D4473B",
              fontWeight: "bold",
              transition: "transform 0.3s ease-in-out", // add transition
              "&:hover": {
                transform: "scale(1.1)", // add transform
                cursor: "pointer", // add pointer cursor
              },
            }}
          >
            Submit 
          </Button>
        </div>
      </div>
    </div>
  );
}

function StyledChip(props) {
  const { clicked, ...rest } = props;
  return (
    <Chip
      variant="outlined"
      {...rest}
      sx={[
        clicked ? { backgroundColor: "#59515e", color: "#D4473B" } : { backgroundColor: "white", color: "black" },
        { margin: 1 },
      ]}
    />
  );
}

export default FormComponent;
