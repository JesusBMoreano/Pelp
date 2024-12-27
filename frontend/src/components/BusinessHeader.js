import React, { useState } from 'react';
import '../styles/BusinessHeader.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Link from '@mui/material/Link';

const BusinessNavBar =() =>{
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const logOff = async () => {
        // Clear the token from local storage or session storage
        localStorage.removeItem('token');
  
        // Additional client-side cleanup, if needed
        console.log('Logged off successfully');
      };
    
    return (
        <nav className='business_navbar'>
            <div className='left_business'>
                <div className='business_logo'>
                  <a href="/home" className="logo"> 
                    Pelp
                    </a>
                    <span id='business_text'>for Business</span>
                </div>
                
            </div>
            <div className='middle_business'>
                <form className = 'searchbars'>
                    <TextField
                        id="searchbar_1"
                        className="searchbar"
                        onInput={(e) => {
                        //setSearchQuery(e.target.value);
                        }}
                        label="Restaurant/Food/Type"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                    />
                    <TextField
                        id="searchbar_2"
                        className="searchbar"
                        onInput={(e) => {
                        //setSearchQuery(e.target.value);
                        }}
                        label="Location"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon id='search_icon'/>
                    </IconButton>
                </form>
                <Link underline="none" className="business_listings">
                    Business Listings
                </Link>
            </div>
            <div className='right_business'>
                
                <Button id='profile' onClick={toggleDropdown}>
                    <AccountCircleIcon />
                </Button>
                {showDropdown && (
                    <div className="dropdown-menu">
                        <Link href="/profile" className="dropdown-item">Profile</Link>
                        <Link href="/logout" className="dropdown-item" onClick={logOff}>Logout</Link>
                    </div>
                )}
            </div>
        </nav>

    );
}    

export default BusinessNavBar;