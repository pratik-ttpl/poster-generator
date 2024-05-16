import store from "../../store/store";
import { all, put, takeLatest } from "redux-saga/effects";
import {
    componentKey,
    setLoading,
    setOpenCreatePosterModal,
    setSnackbarMessage,
    setTemplatesListData,
    setStoredTemplatesListData,
} from "./HomePageSlice";
import HomePageService from "../../services/HomePageService";

export const { getTemplatesList, storeTemplateData, getAuthToken, shareTemplateData, getStoredTemplates } = {
    getTemplatesList: (payload) => {
        return {
            type: "GET_TEMPLATES_LIST",
            payload,
        };
    },
    storeTemplateData: (payload) => {
        return {
            type: "STORE_TEMPLATE_DATA",
            payload,
        };
    },
    getAuthToken: (payload) => {
        return {
            type: "GET_AUTH_TOKEN",
            payload,
        };
    },
    shareTemplateData: (payload) => {
        return {
            type: "SHARE_TEMPLATE_DATA",
            payload,
        };
    },
    getStoredTemplates: (payload) => {
        return {
            type: "GET_STORED_TEMPLATES ",
            payload,
        };
    },
};

function* handleTemplatesListAsync(action) {
    try {
        yield put(setLoading(true));
        const { data } = action.payload;
        const response = yield HomePageService.getTemplatesList(data?.id);
        if (response.status == 200) {
            yield put(setTemplatesListData(response?.data));
        }
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setLoading(false));
    }
}

function* getStoredTemplateListAsync(action) {
    try {
        yield put(setLoading(true));
        const response = yield HomePageService.getStoredTemplatesList();
        if (response.status == 200) {
            yield put(setStoredTemplatesListData(response?.data));
        }
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setLoading(false));
    }
}

function* handleGetAuthTokenAsync(action) {
    try {
        const response = yield HomePageService.getLinkedinAuth();
        if (response.status == 200) {
            console.log("response", response);
        }
    } catch (err) {
        console.log(err);
    } finally {
    }
}

function* storeTemplateAsync(action) {
    try {
        yield put(setLoading(true));
        const { userTemplate, user, posterName } = action.payload;
        const data = {
            userTemplate: userTemplate,
            userName: user,
            posterName: posterName
        };

        const response = yield HomePageService.postTemplateData(data);
        if (response.status == 200) {
            yield put(setSnackbarMessage("Image saved successfully"));
        }
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setLoading(false));
    }
}

function* shareTemplateAsync(action) {
    try {
        yield put(setLoading(true));

        const { Authorization, imagebase64 } = action.payload;
        const data = {
            Authorization: Authorization,
            imageBase64: imagebase64,
        };

        const response = yield HomePageService.postMediaData(data);
        if (response.status == 200) {
            yield put(setSnackbarMessage("Image shared successfully"));
        }
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setOpenCreatePosterModal(false));
        yield put(setLoading(false));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getTemplatesList().type, handleTemplatesListAsync),
        takeLatest(storeTemplateData().type, storeTemplateAsync),
        takeLatest(getAuthToken().type, handleGetAuthTokenAsync),
        takeLatest(shareTemplateData().type, shareTemplateAsync),
        takeLatest(getStoredTemplates().type, getStoredTemplateListAsync),
    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
