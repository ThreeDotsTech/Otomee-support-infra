const IpfsApi = require('ipfs-http-client')

const ipfs = IpfsApi.create({ host: '127.0.0.1', port: '5002', protocol: 'http' })

module.exports = () => {
  return {
    http: {
      port: 3000,
      enabled: true
    },
    'ipfsHttpModule': ipfs,
  }
}
