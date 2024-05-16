import axios from "axios";
import passport from "passport";

const authController = {
    sso: async (req, res) => {
        return res.render("../src/views/pages/index.ejs");
    },

    handleLinkedinCallback: async (req, res) => {
        try {
            axios
                .post(
                    "https://www.linkedin.com/oauth/v2/accessToken",
                    `grant_type=authorization_code&code=${req.query.code}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&redirect_uri=http://localhost:3000/api/linkedin/callback`,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                )
                .then((response) => {
                    const accessToken = response.data.access_token;
                    const expiresIn = response.data.expires_in;
                    return res.json({ accessToken, expiresIn });
                })
                .catch((error) => {
                    console.error(error);
                    throw new Error(error);
                });
        } catch (error) {
            throw new Error(error);
        }
    },

    authenticateLinkedIn: (req, res, next) => {
        const res1 = passport.authenticate("linkedin", {
            scope: ["profile", "openid", "email", "w_member_social"],
        })(req, res, next);
        res.send(res1);
    },
};

export default authController;
