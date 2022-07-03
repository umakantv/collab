const {OAuth2Client} = require('google-auth-library');
const config = require('../config');

const client = new OAuth2Client(config.GOOGLE_OAUTH_CLIENT_ID);

async function verify(token) {
  
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_OAUTH_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const userid = payload['sub'];
}