import axios from "axios";

const postController = {
    createTextPost: async (req, res) => {
        try {
            const { postContent } = req.body;
            if (!postContent) throw new Error("Please pass postContent in body");

            const accessToken = req.header("Authorization").replace("Bearer ", "");
            if (!accessToken) throw new Error("Unauthorized");

            const userInfo = await axios.get(process.env.LINKDIN_GET_PROFILE, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const postData = {
                author: `urn:li:person:${userInfo.data.sub}`,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                            text: postContent,
                        },
                        shareMediaCategory: "NONE",
                    },
                },
                visibility: {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
                },
            };

            const response = await axios.post(process.env.LINKDIN_POST, postData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.send(response.data);
        } catch (error) {
            console.log("error:", error);
            return res.status(error.response ? error.response.status : 500).send({ message: error.message });
        }
    },

    createMediaPost: async (req, res) => {
        try {
            const accessToken = req.header("Authorization").replace("Bearer ", "");
            if (!accessToken) throw new Error("Unauthorized");
            if (!req.body.imageBase64) throw new Error("Please pass imageBase64 in payload");

            const userInfo = await axios.get(process.env.LINKDIN_GET_PROFILE, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const fileBuffer = Buffer.from(req.body.imageBase64, "base64");

            const requestBody = {
                registerUploadRequest: {
                    recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                    owner: `urn:li:person:${userInfo.data.sub}`,
                    serviceRelationships: [
                        {
                            relationshipType: "OWNER",
                            identifier: "urn:li:userGeneratedContent",
                        },
                    ],
                },
            };

            const imageUploadURL = await axios.post(process.env.LINKDIN_UPLOAD_IMAGE, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const uploadImage = await axios.post(
                imageUploadURL.data.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]
                    .uploadUrl,
                fileBuffer,
                {
                    headers: {
                        "Content-Type": "image/jpeg",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const body = {
                author: `urn:li:person:${userInfo.data.sub}`,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                            text: "Feeling inspired after meeting so many talented individuals at this year's conference. #talentconnect",
                        },
                        shareMediaCategory: "IMAGE",
                        media: [
                            {
                                status: "READY",
                                description: {
                                    text: "Center stage!",
                                },
                                media: imageUploadURL.data.value.asset,
                                title: {
                                    text: "LinkedIn Talent Connect 2021",
                                },
                            },
                        ],
                    },
                },
                visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
            };

            const response = await axios.post(process.env.LINKDIN_POST, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.send(response.data);
        } catch (error) {
            console.log("error:", error);
            return res.status(error.response ? error.response.status : 500).send({ message: error.message });
        }
    },
};

export default postController;
