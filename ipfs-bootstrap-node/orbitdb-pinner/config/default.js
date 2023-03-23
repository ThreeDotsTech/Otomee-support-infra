const IpfsApi = require('ipfs-http-client')

const ipfs = IpfsApi.create({ host: '127.0.0.1', port: '5002', protocol: 'http' })


// const IPFS = require('ipfs')
// const ipfs_server = IPFS.create({
//   repo: './orbitdb/pinner',do
//   start: true,
//   EXPERIMENTAL: {
//     pubsub: true
//   },
//   config: {}
// }) // Inject my config

module.exports = () => {
  return {
    http: {
      port: 3000,
      enabled: true
    },
    'ipfsHttpModule': ipfs,
    //Ipfs_server: htttpAPI
  }
}
