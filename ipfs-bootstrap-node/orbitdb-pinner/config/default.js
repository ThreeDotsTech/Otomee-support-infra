import { create } from 'ipfs-http-client'

const ipfs = create({ host: '127.0.0.1', port: '5002', protocol: 'http' })


// const IPFS = require('ipfs')
// const ipfs_server = IPFS.create({
//   repo: './orbitdb/pinner',do
//   start: true,
//   EXPERIMENTAL: {
//     pubsub: true
//   },
//   config: {}
// }) // Inject my config

export default {
  http: {
    port: 3000,
    enabled: true
  },
  'ipfsHttpModule': ipfs,
  //Ipfs_server: htttpAPI
}

