import { makeStyles } from '@material-ui/core/styles';

const CardComponentStyles = makeStyles((theme) => ({
    card: {
      display: 'flex',
      marginBottom: theme.spacing(2),
      margin: '10px',
    },
    media: {
      width: '40%', 
      height: '20%',
      objectFit: 'cover',
    },
    content: {
      flex: 1,
    },
  }));

export default CardComponentStyles;
