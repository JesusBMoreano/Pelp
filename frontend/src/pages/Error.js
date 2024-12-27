import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Error(){
    return (
        <>
            <Typography>
                Error! You have no authroization to be here
            </Typography>
            <Typography
                component={Link}
                to="/"
            >
                Press this to go to the main page!
            </Typography>
        </>
        
    )
}