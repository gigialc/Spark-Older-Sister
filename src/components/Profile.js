import { doc, updateDoc, setDoc, onSnapshot} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";

import NaviBar from './NavigationBar';

import Box from '@mui/material/Box';

import {Paper} from '@mui/material'

import styles from './styles/Profile.module.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

function Profile() {
    //defining our variables that will be used within the dashboard
    // auth, firestore are just to initialize our Firebase for pulling user data and database functions
    const auth = getAuth();
    const firestore = getFirestore();
    // navigate is used to go to search page while passing parameters
    // logged in user's email. Can be used later
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)

    const [password, setPassword] = useState("*******")
    const [checked, setChecked] = useState(false);
    // a user's topics and links to iterate over
    const [topics, setTopics] = useState([])
    const [links, setLinks] = useState([])
    // used as to pass query to search page
    const navigate = useNavigate()
    const [pronouns, setPronouns] = React.useState('Select Pronouns');

    const handlePronounsChange = (event) => {
      setPronouns(event.target.value);
    };
  

  // on page load, we grab the current user's information and populate our variables
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUsername(user.username);
        setEmail(user.email);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        
        
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          try {
            await setDoc(userDocRef, {
              username: "example_username",
              firstname: "example_firstname"
            });
            console.log("User document created successfully");
          } catch (error) {
            console.error("Error creating user document:", error);
          }          
          // setName(userDoc.data().name);
          // setZip(userDoc.data().zip);
          setTopics(userDoc.data().topics);
          setLinks(userDoc.data().links);
        } else {
          setEmail(null);
          setUsername(null);
          setFirstname(null);
          setLastname(null);
          // setZip(null);
          setTopics([]);
          setLinks([]);
        }
      } else {
        setEmail(null);
        setUsername(null);
        setFirstname(null);
        setLastname(null);
        // setZip(null);
        setTopics(null);
        setLinks(null)
      }
    });
    return unsubscribe;
  }, [auth, firestore]);
  function EditableEmail({ email, setEmail }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmail, setEditedEmail] = useState(email);
  
    const handleInputChange = (event) => {
      const { value } = event.target;
      setEditedEmail(value);
    };
  
    const handleSaveClick = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          await updateDoc(userDocRef, { email: editedEmail });
          console.log("Email updated successfully");
          setEmail(editedEmail);
        } catch (error) {
          console.error("Error updating email:", error);
        }
      }
      setIsEditing(false);
    };
  
    const handleCancelClick = () => {
      setEditedEmail(email);
      setIsEditing(false);
    };
  
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          setEmail(doc.data().email);
        });
        return unsubscribe;
      }
    }, []);
  
    if (isEditing) {
      return (
        <>
          <input
            className={styles.content}
            type="text"
            value={editedEmail}
            onChange={handleInputChange}
          />
          <div sx={{ display: 'flex', position: 'relative', right: '100em'}}>
            <Button sx={{ ml: 2 }} onClick={handleSaveClick}>Save</Button>
            <Button sx={{ ml: 2 }} onClick={handleCancelClick}>Cancel</Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className={styles.content} onClick={() => setIsEditing(true)}>
            {editedEmail}
          </p>
        </>
      );
    }
  }
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  function EditableUsername({ username, setUsername }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(username);
  
    const handleInputChange = (event) => {
      const { value } = event.target;
      setEditedUsername(value);
    };
  
    const handleSaveClick = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          await updateDoc(userDocRef, { username: editedUsername });
          console.log("Username updated successfully");
          setUsername(editedUsername);
        } catch (error) {
          console.error("Error updating username:", error);
        }
      }
      setIsEditing(false);
    };
  
    const handleCancelClick = () => {
      setEditedUsername(username);
      setIsEditing(false);
    };
  
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          setUsername(doc.data().username);
        });
        return unsubscribe;
      }
    }, []);
  
    if (isEditing) {
      return (
        <>
          <input
            className={styles.content}
            type="text"
            value={editedUsername}
            onChange={handleInputChange}
          />
          <div sx={{ display: 'flex', position: 'relative', right: '100em'}}>
            <Button sx={{ ml: 2 }} onClick={handleSaveClick}>Save</Button>
            <Button sx={{ ml: 2 }} onClick={handleCancelClick}>Cancel</Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className={styles.content} onClick={() => setIsEditing(true)}>
            {editedUsername}
          </p>
        </>
      );
    }
  }


  function EditableFirstname({ firstname, setFirstname }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFirstname, setEditedFirstname] = useState(firstname);
  
    const handleInputChange = (event) => {
      const { value } = event.target;
      setEditedFirstname(value);
    };
  
    const handleSaveClick = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          await updateDoc(userDocRef, { firstname: editedFirstname });
          console.log("First name updated successfully");
          setFirstname(editedFirstname);
        } catch (error) {
          console.error("Error updating first name:", error);
        }
      }
      setIsEditing(false);
    };
  
    const handleCancelClick = () => {
      setEditedFirstname(firstname);
      setIsEditing(false);
    };
  
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          setFirstname(doc.data().firstname);
        });
        return unsubscribe;
      }
    }, []);
  
    if (isEditing) {
      return (
        <>
          <input
            className={styles.content}
            type="text"
            value={editedFirstname}
            onChange={handleInputChange}
          />
          <div sx={{ display: 'flex', position: 'relative', right: '100em'}}>
            <Button sx={{ ml: 2 }} onClick={handleSaveClick}>Save</Button>
            <Button sx={{ ml: 2 }} onClick={handleCancelClick}>Cancel</Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className={styles.content} onClick={() => setIsEditing(true)}>
            {editedFirstname}
          </p>
        </>
      );
    }
  }

  function EditableLastname({ lastname, setLastname }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedLastname, setEditedLastname] = useState(lastname);
  
    const handleInputChange = (event) => {
      const { value } = event.target;
      setEditedLastname(value);
    };
  
    const handleSaveClick = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          await updateDoc(userDocRef, { lastname: editedLastname });
          console.log("Last name updated successfully");
          setLastname(editedLastname);
        } catch (error) {
          console.error("Error updating last name:", error);
        }
      }
      setIsEditing(false);
    };
  
    const handleCancelClick = () => {
      setEditedLastname(lastname);
      setIsEditing(false);
    };
  
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          setLastname(doc.data().lastname);
        });
        return unsubscribe;
      }
    }, []);
  
    if (isEditing) {
      return (
        <>
          <input
            className={styles.content}
            type="text"
            value={editedLastname}
            onChange={handleInputChange}
          />
          <div sx={{ display: 'flex', position: 'relative', right: '100em'}}>
            <Button sx={{ ml: 2 }} onClick={handleSaveClick}>Save</Button>
            <Button sx={{ ml: 2 }} onClick={handleCancelClick}>Cancel</Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className={styles.content} onClick={() => setIsEditing(true)}>
            {editedLastname}
          </p>
        </>
      );
    }
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

    const handleChange = async (event) => {
      const auth = getAuth();
      if (auth.currentUser) {
        // add topics to user's thing
        // Send API call to Firebase with selectedTopics array
        // Example API call using fetch:
        // event.preventDefault();
        // const userRef = doc(db, "users", auth.currentUser.uid);
        // console.log(urlList)
        // Add topics array to user profile in Firestore
        // setDoc(userRef, { email: auth.currentUser.email, topics: selectedTopics, links: urlList }, { merge: true })
        //   .then(() => {
      //      navigate("/dashboard", { state: { uuid: auth.currentUser.uid} });
      //     })
      //     .catch((error) => {
      //       alert(error.message);
      //     });
      // } else {
      //   // If the user is not authenticated, prompt them to log in
      //   alert("Please log in to add articles.");
      //   navigate("/login");
      // }
      }}



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
            
          <div className={styles.name}>
              {/* <AccountCircleIcon className={styles.icon} /> */}
              <Avatar sx={{ width: 200, height: 200 , fontSize:'2.5em', borderRadius:'70px'}}>
                {email ? email.charAt(0) : ''}
              </Avatar>

              <h2>{email}</h2>  
            </div>      
            
            <br></br>

            
              <div className={styles.rightChildTop}>
                <h1> Account Information </h1>
               


                <div className={styles.nameinput}>
                  <div className ={styles.field}>
                    <p className={styles.label}>First Name:</p>
                    <EditableFirstname firstname={firstname} setFirstname={setFirstname} />
                  </div>
                  <div className ={styles.field}>
                    <p className={styles.label}>Last Name:</p>
                    <EditableLastname lastname={lastname} setLastname={setLastname} />
                  </div>
                 
                </div>
                <br></br>

                <div className={styles.check}>
                  <Checkbox checked={checked} onChange={handleCheckboxChange} sx={{color:"#ef6448"}}/>
                  <span >Use Username instead of Personal Name for Account</span>
                </div>
               


                <div className={styles.nameinput}>
                  <div className ={styles.field}>
                      <p className={styles.label}>Username:</p>
                      <EditableUsername username={username} setUsername={setUsername} />
                      <br></br>
                  </div>
                  <div className={styles.field}>
                    <p className={styles.label}>Email:</p>
                   
                      <EditableEmail email={email} setEmail={setEmail} />
                      <div className={styles.small}>Email is private.</div>
                  </div>
                 </div>

                <p className={styles.label}>Pronouns:</p>
                <Box sx={{ minWidth: 120 }} className={styles.pronouns} >
                  <FormControl variant="standard" sx={{ width: '20em', height: '1.5em'}}>
                    <InputLabel>Pronouns</InputLabel>
                    <Select
                      value={pronouns}
                      // label="Pronouns"
                      onChange={handlePronounsChange} 
                      renderValue={(value) => (value === '' ? 'Select Pronouns' : value)}

                      sx = {{backgroundColor: 'white'}}
                    >
                       <MenuItem value="" disables >Select Pronouns</MenuItem>
                      <MenuItem value="she/her">She/Her</MenuItem>
                      <MenuItem value="he/him">He/Him</MenuItem>
                      <MenuItem value="they/them">They/Them</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <br></br>
                <br></br>

                <h1> Change Password </h1>
                
               
                <div className ={styles.field}>
                  <p className={styles.label}>Enter old password:</p>
                  <input className={styles.content} type="password" />

                <div className={styles.nameinput}>
                <div className ={styles.field}>
                  <p className={styles.label}>Enter new password:</p>
                  <input className={styles.content}  />
                  </div>
                  <div className ={styles.field}>
                  <p className={styles.label}>Re-enter new password:</p>
                  <input className={styles.content}/>
                  </div>
                </div>
                </div>
                <Button  onClick={handleChange} className={styles.change} 
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
          marginTop: '20px',
          marginLeft: '28%',
          }}>
        Change
        </Button>
     
                <br></br>
                <br></br>
                <br></br>
            </div>
          </Paper>

        </div>
    </main>
    );
  }
  


export default Profile;
