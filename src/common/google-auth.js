const {OAuth2Client} = require('google-auth-library');

const verifyToken = (token) => {

    const CLIENT_ID = '529740343380-9jll9kno8q5ioao7omslpgp786dak767.apps.googleusercontent.com'

    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      return payload
      
    }
    verify().catch("error");

    return verify()

}

module.exports = verifyToken