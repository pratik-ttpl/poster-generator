import dotenv from "dotenv";
import expressService from "./services/express.service.js";
import mongoose from "mongoose";

dotenv.config();

const services = [expressService];

(async () => {
    try {
        const { DB_HOST, DB_PORT, DB_NAME, DB_DIALECT } = process.env;
        const connection_uri = `${DB_DIALECT}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        await mongoose.connect(connection_uri);

        for (const service of services) {
            await service.init();
        }
        console.log("Server initialized.");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
