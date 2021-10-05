/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { oktaAuthRequired } from './lib/oktaAuthRequired'

const okta = require('@okta/okta-sdk-nodejs')


// utest19

dotenv.config({
  path: '.env',
})

const app: Express = express()
const PORT = process.env.APP_PORT as string

app.use(cors())

app.get('/api/user/', oktaAuthRequired, async (req: Request, res: Response) => {
  const id = req.params.id
  const client = new okta.Client({
    orgUrl: 'https://psoplaneta.okta.com/',
    token: '00HVlwiGm7otOVCLgsHu5T-QlCEazLXeyJUVO4uvQ1'    // Obtained from Developer Dashboard
  })
  let response = await client.getUser('utest19')
  res.send({
    'id': response.id,
    'mail': response.profile.mail,
    'name': response.profile.firstName,
    'surname': response.profile.lastName
  })
})

app.get('/authorization-code/callback', ((req: Request, res: Response) => {

  console.log(res)
}))


app.get('/api/locked', oktaAuthRequired, (req: Request, res: Response) => {

  res.json({
    messages: [
      {
        date: new Date(),
        text: 'message 1',
      },
      {
        date: new Date(),
        text: 'message 2',
      },
    ],
  })
})

app.get('/api/free', (req: Request, res: Response) => {
  res.json({
    messages: [
      {
        date: new Date(),
        text: 'AUTHENTICATED FROM /api/free',
      },
    ],
  })
})

app.listen(PORT, () => {
  console.log(`We LIVE at http://localhost:${PORT}`)
})
