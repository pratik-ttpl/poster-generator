const axios = require("axios")

const postService = {
  createTextPost: async (accessToken, content, sub) => {
    try {
      const postUrl = process.env.LINKDIN_POST

      const postData = {
        author: `urn:li:person:${sub}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: "IMAGE",
            media: [
              {
                status: "READY",
                description: {
                  text: "Image Description",
                },
                media: "urn:li:digitalmediaAsset:C4D0AAAAdpCpLK8VdgQ",
              },
            ],
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      }

      axios
        .post(postUrl, postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Cookie:
              'bcookie="v=2&0fd703c8-6c91-4848-823c-455648bebfd6"; lidc="b=OB02:s=O:r=O:a=O:p=O:g=4410:u=1:x=1:i=1705494814:t=1705581214:v=2:sig=AQHDLv_D5ca23yULOWe4YgWVl-iSC1AQ"',
          },
        })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
          throw new Error(error)
        })
    } catch (error) {
      throw new Error(error)
    }
  },
}

export default postService
