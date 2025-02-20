const { google } = require('googleapis');
require('dotenv').config();

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

async function testOAuth2() {
  try {
    console.log('Refresh Token:', process.env.OAUTH_REFRESH_TOKEN);
    const accessToken = await oauth2Client.getAccessToken();
    console.log('Access Token:', accessToken);
  } catch (error) {
    console.error('Error obtaining access token:', error);
  }
}

testOAuth2();