import commandLineArgs from 'command-line-args'
import config from './config/index.js'

import { Pinner } from './lib/OrbitPinner.js'
import { server } from './lib/httpServer.js'

const optionDefinitions = [
  { name: 'address', alias: 'd', type: String },
  { name: 'http', alias: 's', type: Boolean },
  { name: 'port', alias: 'p', type: Number },
  { name: 'follow', alias: 'f', type: String }
]

const options = commandLineArgs(optionDefinitions)

const {
  address,
  follow,
  port = config.http.port
} = options

const http = options.httpPort || config.http.enabled

if (!address && !http && !follow) {
  console.log('Orbit pinner requires an orbitdb address or http to be enabled')
  process.exit()
} else if (address) {
  // TODO maybe here need to create
  console.log('Starting, from a given address')
  new Pinner(address) /* eslint-disable-line */
} else if (http) {
  console.log('starting http')
  new server(port) /* eslint-disable-line */
} else if (follow) {
  console.log('following')
  const pinningList = require('./lib/pinningList')
  pinningList.follow(follow)
}
