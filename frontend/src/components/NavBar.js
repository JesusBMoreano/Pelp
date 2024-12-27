import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Link as LinkFix} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from './Form'

const NavBar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      try {
        const payload = jwtToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const newUserRole = decodedPayload.userRole;
        setUserRole(newUserRole);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);


 return (
  
   <AppBar position="sticky">
     <Toolbar>
       <Typography
         component={Link}
         to="/"
         variant="h6"
         sx={{ flexGrow: 1,
               fontFamily: "'Inria Sans', sans-serif",
               fontWeight: 700,
               color: 'white',
               textDecoration: 'none',
               fontSize: '2rem',
               marginLeft: -1
             }}
       >
         Pelp
       </Typography>
       <Box>
         <Form />
       </Box>
       <Box sx={{ display: 'flex' }}>
         {/* Different menu items based on userRole */}
         {/* Admin Components */}
         {userRole === 'admin' && (
           <>
             <Button color="inherit" component={Link} to="/admin">
               Admin Dashboard
             </Button>
           </>
         )}

         {/* Business Components */}
         {userRole === 'owner' && (
           <>
             <Button color="inherit" component={Link} to="/dashboard">
               Dashboard
             </Button>
           </>
         )}

         {/*{userRole === 'owner' && (
           <>
             <Button color="inherit" component={Link} to="/newrestaurant">
               Add Restaurant
             </Button>
           </>
         )} */}
         

          {/* User Signed in Components */}
         {userRole !== 'guest' && (
           <>
             <Button color="inherit" onClick={() => {
               localStorage.removeItem('token');
               navigate('/');
               window.location.reload();
             }}>
               Logout
             </Button>
           </>
         )}


         {/* For guest users or when the role is not recognized */}
         {userRole === 'guest' && (
           <>
             <Button
               color="inherit"
               component={Link}
               to="/login"
               sx ={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',}}
             >
               Login
             </Button>
             <Button
               color="inherit"
               component={Link}
               to="/register"
               sx ={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',}}
             >
               Register
             </Button>
           </>
         )}
       </Box>
     </Toolbar>
   </AppBar>
 );
};


export default NavBar;

