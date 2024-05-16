import { makeStyles } from "@material-ui/core/styles";

const HomePageStyle = makeStyles((theme) => ({
    page: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#edf5f5",
    },
    header: {
        alignItems: "center",
        marginBottom: "10px",
    },
    createPosterButton: {
        marginRight: "20px",
        marginBottom: "10px",
        position: "relative",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        outline: "none",
        borderRadius: "8px",
        overflow: "auto",
    },
    modelContent: {
        height: "750px",
        width: "1000px",
    },
    posterContent: {
        height: "90%",
        width: "100%",
        // paddingTop: '20px',
    },
    templateContainer: {
        display: "flex",
        height: "100%",
        width: "100%",
    },
    containerWrapper: {
        // height: '50%',
        width: "31%",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        height: "40%",
        // width: '31%',
        justifyContent: "space-around",
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
    },
    imageContainer: {
        height: "100%",
        width: "62%",
        paddingLeft: "46px",
    },
    button: {
        width: "80px",
    },
    buttonContainer: {
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        flexDirection: "row",
        marginTop: theme.spacing(2),
        justifyContent: "space-between",
        display: "flex",
    },
    closeButtonContainer: {
        display: "flex",
        justifyContent: "space-between",
    },

    previewCloseButtonContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
    },
    closeButton: {
        padding: "2px",
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    previewModelContent: {
        width: "678px",
        height: "671px",
        paddingRight: "15px",
        paddingLeft: "15px",
    },
    // previewImageContainer: {
    //     height: "100%",
    //     width: "62%",
    // },
}));

export default HomePageStyle;
