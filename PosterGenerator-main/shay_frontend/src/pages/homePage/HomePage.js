import React, { useEffect } from "react";
import DataGrid from "../../components/DataGrid";
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import CardComponent from "../../components/CardComponent";
import HomePageHeader from "./HomePageHeader";
import HomePageStyle from "../../assets/css/homePageStyle/HomePageStyle";
import { useDispatch, useSelector } from "react-redux";
import { componentKey, setOpenCreatePosterModal, setOpenPreviewModal } from "./HomePageSlice";
import ModalComponent from "../../components/ModalComponent";
import PostarModalContent from "../addPosterPage/PostarModalContent";
import CloseIcon from "@material-ui/icons/Close";
import { getStoredTemplates } from "./HomePageSaga";
import TransparentLoader from "../../components/LoaderComponent";
import PreviewModal from "./PreviewModal";

const columns = [
    { id: "posterName", label: "Name" },
    { id: "createdDate", label: "Created Date" },
    { id: "userName", label: "Created By" },
];

const HomePage = () => {
    const classes = HomePageStyle();
    const dispatch = useDispatch();

    const { openCreatePosterModal, storedTemplatesList, isLoading, openPreviewModal } = useSelector(
        (state) => state[componentKey]
    );

    useEffect(() => {
        dispatch(getStoredTemplates());
    }, []);

    const handleCreatePosterClick = () => {
        dispatch(setOpenCreatePosterModal(true));
    };

    const handleCloseModal = () => {
        dispatch(setOpenCreatePosterModal(false));
    };
    const handleClosePreviewModal = () => {
        dispatch(setOpenPreviewModal({ isOpen: false }));
    };

    const onActionClick = () => {
    };

    const actions = {
        preview: {
            label: "Preview",
            handler: (row) => {
                dispatch(setOpenPreviewModal({ isOpen: true, rowData: row }));
            },
        },
    };

    return (
        <div className={classes.page}>
            <HomePageHeader></HomePageHeader>

            <Typography component="div">
                <Grid container justifyContent="flex-end">
                    <Button
                        onClick={handleCreatePosterClick}
                        className={classes.createPosterButton}
                        variant="contained"
                        size="medium"
                    >
                        Create Poster
                    </Button>
                </Grid>
                {isLoading ? (
                    <TransparentLoader />
                ) : (
                    storedTemplatesList.length && (
                        <DataGrid
                            columns={columns}
                            data={storedTemplatesList}
                            actions={actions}
                            onActionClick={onActionClick}
                        ></DataGrid>
                    )
                )}

                {/* {data.map((item, index) => (
        <CardComponent key={index} {...item} />
      ))} */}
            </Typography>

            <ModalComponent open={openCreatePosterModal} handleClose={handleCloseModal}>
                <Typography className={classes.modelContent} variant="h6" component="div">
                    <div className={classes.closeButtonContainer}>
                        Create New Poster
                        <IconButton onClick={handleCloseModal} className={classes.closeButton}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <PostarModalContent />
                </Typography>
            </ModalComponent>
            <ModalComponent open={openPreviewModal?.isOpen} handleClose={handleClosePreviewModal}>
                <div className={classes.previewCloseButtonContainer}>
                    <IconButton onClick={handleClosePreviewModal} className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography className={classes.previewModelContent} variant="h6" component="div">
                    <PreviewModal row={openPreviewModal?.rowData} />
                </Typography>
            </ModalComponent>
        </div>
    );
};

export default HomePage;
