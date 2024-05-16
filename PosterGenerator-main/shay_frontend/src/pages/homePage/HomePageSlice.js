import store from "../../store/store";

export const componentKey = "HOME_PAGE";

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setTemplatesListData: (state, action) => {
            state.templatesListData = action.payload;
        },
        setOpenCreatePosterModal: (state, action) => {
            state.openCreatePosterModal = action.payload;
        },
        setImageCaptions: (state, action) => {
            state.imageCaptions = action.payload;
        },
        setImageBottomText: (state, action) => {
            state.imageBottomText = action.payload;
        },
        setUploadImage: (state, action) => {
            state.uploadedImage = action.payload;
        },
        setUpdatePostData: (state, action) => {
            state.updatePostData = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSnackbarMessage: (state, action) => {
            state.snackbarMessage = action.payload;
        },
        setStoredTemplatesListData: (state, action) => {
            state.storedTemplatesList = action.payload;
        },
        setOpenPreviewModal: (state, action) => {
            state.openPreviewModal.isOpen = action.payload.isOpen;
            state.openPreviewModal.rowData = action.payload.rowData || {};
        },
    },
    initialReducerState: {
        templatesListData: null,
        openCreatePosterModal: false,
        imageCaptions: "",
        imageBottomText: "",
        uploadedImage: null,
        updatePostData: {},
        isLoading: false,
        snackbarMessage: "",
        storedTemplatesList: [],
        openPreviewModal: { isOpen: false, rowData: {} },
    },
});

export const {
    setTemplatesListData,
    setOpenCreatePosterModal,
    setUploadImage,
    setLoading,
    setImageBottomText,
    setImageCaptions,
    setUpdatePostData,
    setSnackbarMessage,
    setStoredTemplatesListData,
    setOpenPreviewModal,
} = actions;
