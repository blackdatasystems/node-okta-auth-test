const OktaJwtVerifier = require('@okta/jwt-verifier')
require('dotenv').config()

const OKTA_DOMAIN = process.env.OKTA_DOMAIN
// dev-57652992.okta.com
export const oktaAuthRequired = (req: any, res: any, next: any) => {
  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `https://psoplaneta.okta.com/oauth2/default`
  })
  console.log(req.headers)
  const token = req.headers.authorization.match(/Bearer (.+)/)[1] || ''

  return (
    oktaJwtVerifier.verifyAccessToken(token, 'api://default')
      .then((jwt: any) => {
        console.log(jwt)
        req.jwt = jwt
        next()
      })
      .catch((err: any) => console.log('token false', err.message))
  )
}