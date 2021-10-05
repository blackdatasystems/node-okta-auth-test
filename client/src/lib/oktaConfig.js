const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REACT_APP_OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN
const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
const REACT_APP_PORT = process.env.REACT_APP_PORT

export const oktaConfig = {
  clientId: `0oa1952jzvmBw6HLS417`,
  issuer: `https://psoplaneta.okta.com`,
  redirectUri: `http://localhost:3000/authorization-code/callback`, // this makes it so redirects to login if not logged in for secure routes
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
}
