import posterTemplateRepo from "../repositories/posterTemplate.repo.js";

const posterTemplateController = {
    getPosterTemplate: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await posterTemplateRepo.getPosterTemplate(id);
            res.status(200)
            res.send(response);
        } catch (err) {
            res.status(err.statusCode || 500).json({
                status: "error",
                error: err,
                message: err.message || "Internal Server Error",
            });
        }
    },
    generateAndSavePoster: async (req, res) => {
        try {
            const response = await posterTemplateRepo.generateAndSavePoster(req);
            res.status(201)
            res.send(response);
        } catch (err) {
            res.status(err.statusCode || 500).json({
                status: "error",
                error: err,
                message: err.message || "Internal Server Error",
            });
        }
    },
};

export default posterTemplateController;
