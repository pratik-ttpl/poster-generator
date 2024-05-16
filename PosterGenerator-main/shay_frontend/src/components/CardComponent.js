import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardComponentStyles from '../assets/css/CardComponentStyle';

const CardComponent = ({ name, imageUrl }) => {
    const defaultImageUrl = 'tuxpi.com.1705504703.jpg';
    const imageSource = imageUrl || defaultImageUrl;
    const classes = CardComponentStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                alt={name}
                image={imageUrl}
                className={classes.media}
            />
            <CardContent className={classes.content}>
                <Typography variant="h6" component="div">
                    {name}
                </Typography>
                {/* <Typography color="textSecondary">{`Age: ${age} | City: ${city}`}</Typography> */}
            </CardContent>
        </Card>
    );
};

export default CardComponent;
