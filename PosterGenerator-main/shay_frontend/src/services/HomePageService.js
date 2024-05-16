import AppDataService from "./AppDataService";

const COMMON_BASE = "api";
const templateID = process.env.REACT_APP_TEMPLATE_ID;

export default class HomePageService {
    static async getTemplatesList(id) {
        return await AppDataService.get(`${COMMON_BASE}/poster/template/${templateID}`);
    }
    static async postTemplateData(data) {
        return await AppDataService.post(`${COMMON_BASE}/poster/generate`, data);
    }
    static async getLinkedinAuth() {
        return await AppDataService.get(`${COMMON_BASE}/linkedin`);
    }
    static async postMediaData(data) {
        return await AppDataService.post(`${COMMON_BASE}/createMediaPost`, data);
    }
    static async getStoredTemplatesList() {
        return await AppDataService.get(`${COMMON_BASE}/users/templates`);
    }
}
