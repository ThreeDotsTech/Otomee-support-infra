'use strict'
const OrbitDB = require('orbit-db')
const Identities = require('orbit-db-identity-provider')
let orbitdb


class Pinner {
  constructor(db) {
    this.db = db
    this.address = db.id
  }


  static async create(address) {
    console.log('creating db for', address)
    const ipfs = await require('./ipfsInstance')
    if (!orbitdb) {
      let identity = await Identities.createIdentity({ type: "ethereum" })
      orbitdb = await OrbitDB.createInstance(ipfs, { identity })
    }
    const db = await Pinner.openDatabase(orbitdb, address)
    return Promise.resolve(new Pinner(db))
  }

  drop() {
    // console.log(this.orbitdb)
    // this.orbitdb.disconnect()
  }

  get estimatedSize() {
    let size = 0

    if (this.db) {
      // This is very crude
      size = JSON.stringify(this.db._oplog.values).length
    }

    return size
  }

  static async openDatabase(orbitdb, address) {
    console.log('trying to open db', address)
    //	const name = await orbitdb.docstore('otomee-orderbook-alpha.v0', { indexBy: 'hash', accessController: { write: ['*'] } })
    //	console.log('created db', name)
    try {
      if (!OrbitDB.isValidAddress(address)) {
        console.log(`Failed to add ${address}. This is not a valid address`)
        return
      }

      console.log(`opening database from ${address}`)
      const db = await orbitdb.open(address, { sync: true, timeout: 1000000 })

      console.log('Listening for updates to the database...')
      await db.load()

      return db
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = Pinner
