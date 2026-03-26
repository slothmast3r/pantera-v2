'use strict'

/**
 * Entry point for cPanel / Phusion Passenger.
 *
 * cPanel Node.js App config:
 *   Application startup file: server.cjs
 *   Node.js version:          20.x (or 18.x)
 *   Application mode:         production
 */

const http = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    http
      .createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
      })
      .listen(port, () => {
        console.log(`> Pantera ready on port ${port} [${process.env.NODE_ENV}]`)
      })
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
