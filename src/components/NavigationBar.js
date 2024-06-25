import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Coin from '@mui/icons-material/AccountBalanceWallet';
import Edit from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import logo from './logo.png';
import styles from './styles/navigation.module.css';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  margin: '8px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  // alignItems: 'center',
  width: '100%',
  borderRadius: '30px',
  // margin: theme.spacing(1),
  backgroundColor: 'lightgray',
  boxShadow: 'none',
  height: '30px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    // padding: theme.spacing(1, 1, 1, 0),
    width: '100%',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {

      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between', // Add this line
}));

function NaviBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [urlList, setUrl] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (href) => {
    navigate(href);
    handleMenuClose();
  };
  



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentPath === '/search') {
      navigate('/search', { state: { query: searchInput } });
      window.location.reload();
    } else {
      navigate('/search', { state: { query: searchInput } });
    }
  };

  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
          <Toolbar className={styles.toolbar}>
          <Link to="/dashboard" className={styles.header}>
              <img src={logo} alt="Older Sister Logo" className={styles.logoImage} />
              {/* <h1 className={styles.logoText}>Older Sister</h1> */}
            </Link>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuOpen}
              className={styles.iconButton}
            >
              <AccountCircleIcon fontSize="large" className={styles.accountIcon} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                <AccountCircleIcon /> Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/dashboard')}>
                <DashboardCustomizeIcon /> Dashboard
              </MenuItem>
              {/* <MenuItem onClick={() => handleMenuItemClick('/ContributorFeed')}>
                <DashboardCustomizeIcon /> Contributor Feed
              </MenuItem> */}
              <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                <Coin/> Coin Shop
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/survey')}>
                <Edit /> Edit Topics
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/liked')}>
                <FavoriteIcon /> Bookmarks
              </MenuItem>
              {/* <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                <ArticleIcon /> Accessibility
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                <ArticleIcon /> Notifications
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                <ArticleIcon /> Privacy
              </MenuItem> */}
              <MenuItem onClick={() => handleMenuItemClick('/register')}>
                <LogoutIcon /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
          <Toolbar className={styles.searchBar}>
            <Search>
              <StyledPaper component="form" onSubmit={handleSubmit}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </StyledPaper>
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

    </main>
  );
}

export default NaviBar;
