import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import path from 'path';
import url from 'url';
import cors from 'cors';
import passport from "passport";
import session from "express-session";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2"


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routeFiles = fs
  .readdirSync(__dirname + "/../routes/")
  .filter(
    (file) => file.endsWith(".js")
  );

let server;
let routes = [];

const expressService = {
  init: async () => {
    try {
      for (const file of routeFiles) {
        const route = await import(`../routes/${file}`);
        const routeName = Object.keys(route)[0];
        routes.push(route[routeName]);
      }

      server = express();
      const corsOptions = {
        origin: 'http://your-react-app-origin.com',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
      };
      
      server.use(cors(corsOptions));
      server.set('view engine', 'ejs');
      server.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET'
      }));
      server.use(passport.initialize());
      server.use(passport.session());
      server.use(express.json({ limit: '10mb' }));
      passport.serializeUser(function (user, cb) {
        cb(null, user);
      });
      passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
      });
      passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: process.env.LINKEDIN_CALLBACK_URL,
        scope: ['profile', 'openid', 'email', 'w_member_social'],
      }, function (token, tokenSecret, profile, done) {
        return done(null, profile);
      }
      ));
      server.use(bodyParser.json());
      server.use(process.env.API_PRFIX, routes);
      server.listen(process.env.SERVER_PORT);
      console.log("[EXPRESS] Express initialized");
    } catch (error) {
      console.log("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;