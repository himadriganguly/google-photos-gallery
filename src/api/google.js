import { OAuth2Client } from "google-auth-library";
// import google from "googleapis";
import axios from "axios";
import googleConfig from "../../client_id.json";

// console.log("googleConfig: ", googleConfig.web);

const CLIENT_ID = googleConfig.web.client_id;
const CLIENT_SECRET = googleConfig.web.client_secret;
const REDIRECT_URI = googleConfig.web.redirect_uris[0];
const TOKEN_URI = googleConfig.web.token_uri;

const GET_IMAGES_URL = "https://photoslibrary.googleapis.com/v1/mediaItems";
const UPLOAD_IMAGE_URL = "https://photoslibrary.googleapis.com/v1/uploads";

const SCOPES = ["https://www.googleapis.com/auth/photoslibrary.readonly"];

const FETCH_MEDIA_ITEMS = "https://photoslibrary.googleapis.com/v1/mediaItems";

export default {
  login() {
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    // const oauth2Client = new google.auth.OAuth2(
    //   CLIENT_ID,
    //   CLIENT_SECRET,
    //   REDIRECT_URI
    // );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES
    });

    // const url = oauth2Client.generateAuthUrl({
    //   // 'online' (default) or 'offline' (gets refresh_token)
    //   access_type: "offline",
    //
    //   // If you only need one scope you can pass it as a string
    //   scope: ["https://www.googleapis.com/auth/photoslibrary.readonly"]
    // });

    // console.log("url1: ", authorizeUrl);
    // console.log("url2: ", url);

    // window.location = `${ROOT_URL}/o/oauth2/auth?${queryString}`;
    window.location = authorizeUrl;
  },
  getGoogleAccessToken(code) {
    return axios
      .post(TOKEN_URI, {
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI
      })
      .then(result => {
        return result.data.access_token;
      });
  },
  fetchImages(token) {
    return axios.get(FETCH_MEDIA_ITEMS, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
