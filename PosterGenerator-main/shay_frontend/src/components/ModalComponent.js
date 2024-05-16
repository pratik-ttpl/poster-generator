import { Modal } from "@material-ui/core";
import HomePageStyle from "../assets/css/homePageStyle/HomePageStyle";

const ModalComponent = ({ open, handleClose, children }) => {
    const classes = HomePageStyle();
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>{children}</div>
      </Modal>
    );
  };
  
  export default ModalComponent;