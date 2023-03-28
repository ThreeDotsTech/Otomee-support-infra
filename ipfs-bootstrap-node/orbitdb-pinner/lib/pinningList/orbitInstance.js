import OrbitDB from 'orbit-db'

import ipfsInstanceP from '../ipfsInstance.js'

const orbitInstance = new Promise(resolve => {
  ipfsInstanceP.then(ipfsInstance => {
    resolve(OrbitDB.createInstance(ipfsInstance, {
      directory: './orbitdb/pinner/Manifest'
    }))
  })
})

export default createDbInstance = async addr => {
  const address = addr || 'dbList'
  const dbInstance = await orbitInstance

  const pinningList = {
    create: true,
    overwrite: true,
    localOnly: false,
    type: 'feed'
  }

  const db = await dbInstance.open(address, pinningList)

  await db.load()

  return db
}
