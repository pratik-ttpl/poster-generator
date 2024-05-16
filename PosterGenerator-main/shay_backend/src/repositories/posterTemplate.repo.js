import { Errors } from "../utils/errors.js";
import PosterTemplate from "../models/PosterTemplate.js";
import User from "../models/User.js";

const posterTemplateRepo = {
    getPosterTemplate: async (id) => {
        try {
            const data = await PosterTemplate.findById(id);
            if (!data) {
                throw Errors.NOT_FOUND;
            }
            return data;
        } catch (error) {
            console.error("Error while getting poster template", error);
            throw Errors.SERVER_ERROR;
        }
    },
    generateAndSavePoster: async (req) => {
        try {
            const body = {
                userId: req.body.userId,
                userTemplate: req.body.userTemplate,
                posterName: req.body.posterName,
            };

            if (req.body.userName) {
                body.userName = req.body.userName;
            }
            const template = await User.create(body);
            return template;
        } catch (error) {
            console.error("Error while generating and saving poster", error);
            throw Errors.SERVER_ERROR;
        }
    },
};

export default posterTemplateRepo;
