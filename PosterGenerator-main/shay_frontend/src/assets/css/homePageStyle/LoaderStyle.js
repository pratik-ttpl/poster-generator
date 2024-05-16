import { makeStyles } from '@material-ui/core/styles';

const LoaderStyle = makeStyles((theme) => ({
    style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 9999,
    }
}));

export default LoaderStyle;
