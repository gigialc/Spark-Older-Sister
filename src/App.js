import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Survey from './components/Survey';
import Register from './components/Register';
import Search from './components/Search';
import FormComponent from './components/FormContributor.js';
import Insights from "./components/scripts/insights";
import Profile from "./components/Profile";
import ContributorPage from "./components/ContributorFeed";
import LikedArticles from "./components/LikedArticles";
import Coin from "./components/Coin.js";
import Access from "./components/Access.js";
import Notif from "./components/Notif.js";
import Searchpage from "./components/Searchpage.js";
import { OpenAI } from './components/scripts/openAI'
<<<<<<< Updated upstream
//hello lol 
=======
import Welcome from './components/welcome';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Welcome />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/dashboard" element = {<Dashboard />}/>
        <Route path="/survey" element = {<Survey />} />
        {/* <Route path="/register" element = {<Register />} /> */}
        <Route path="/summarization" element = {<OpenAI />} />
        <Route path="/search" element = {<Search />} />
        <Route path="/contributor" element = {<FormComponent />} />
        <Route path="/insights" element = {<Insights />} />
        <Route path="/profile" element = {<Profile />} />
        <Route path="/contributorfeed" element={<ContributorPage/>}/>
        <Route path="/liked" element={<LikedArticles/>}/>
        <Route path="/searchpage" element={<Searchpage/>}/>
        {/* <Route path="/coin" element={<Coin/>}/>
        <Route path="/access" element={<Access/>}/>
        <Route path="/notif" element={<Notif/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
