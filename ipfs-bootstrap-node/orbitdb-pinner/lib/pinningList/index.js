import OrbitDB from 'orbit-db'

import { Pinner as OrbitPinner } from '../OrbitPinner.js'
import orbitInstance from './orbitInstance.js'

const pinners = {}

export const getContents =
  async () => {
    const db = await orbitInstance

    return db.iterator({ limit: -1 })
      .collect()
      .map(
        e => {
          return e.payload.value
        }
      )
  }

export const getPinners = () => pinners

export const add =
  async (address) => {
    const db = await orbitInstance()

    if (!OrbitDB.isValidAddress(address)) {
      console.log(`Failed to add ${address}. This is not a valid address`)
      return
    }

    const addresses = await getContents()

    if (!addresses.includes(address)) {
      await db.add(address)
      createPinnerInstance(address)
    } else {
      console.warn(`Attempted to add ${address}, but already present in db.`)
    }
  }

export const create =
  async (name) => {
    const db = await orbitInstance()

    const pinner = await OrbitPinner.new(name)

    await db.add(pinner.address)
    console.log(`${pinner.address} added to pinner.`)
    return pinner.address
  }

const createPinnerInstance =
  async (address) => {
    if (!OrbitDB.isValidAddress(address)) {
      console.log(`Failed to pin ${address}. This is not a valid address`)
      return
    }

    console.log(`Pinning orbitdb @ ${address}`)
    const pinner = await OrbitPinner.create(address)
    if (!pinner) return

    pinners[address] = pinner
    console.log(`${address} added to pinnging list.`)
    return pinners[address]
  }

const startPinning =
  async () => {
    const addresses = await getContents()

    if (addresses.length === 0) {
      console.log('Pinning list is empty')
    }

    addresses
      .map(createPinnerInstance)
  }

export const remove =
  async (address) => {
    if (!OrbitDB.isValidAddress(address)) {
      console.log(`Failed to unpin ${address}. This is not a valid address`)
      return
    }

    if (!pinners[address]) {
      console.log(`Failed to unpin ${address}. Address not found in pinning list.`)
      return
    }

    const db = await orbitInstance()
    const dbAddresses = await getContents()

    // stop pinning
    pinners[address].drop()
    delete pinners[address]

    // Unfortunately, since we can't remove a item from the database without it's hash
    // So we have to rebuild the data every time we remove an item.
    await db.drop()

    dbAddresses
      .filter(addr => (addr !== address))
      .forEach(
        address => db.add(address)
      )

    console.log(`${address} removed.`)
  }

export const follow =
  async (address) => {
    if (!OrbitDB.isValidAddress(address)) {
      console.log(`Failed to follow ${address}. This is not a valid address`)

      return
    }
    console.log('excecuted follow function', address)
    // await db.drop()
    await orbitInstance(address)
    startPinning()
  }

console.log('Pinning previously added orbitdbs: ')
startPinning()

