import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import LoaderStyle from '../assets/css/homePageStyle/LoaderStyle';

const TransparentLoader = ({ size = 40, color = 'primary' }) => {
    const classes = LoaderStyle()

    return <Typography component='div' className={classes.style}>
        <CircularProgress size={size} color={color} />
    </Typography>
}



export default TransparentLoader;
