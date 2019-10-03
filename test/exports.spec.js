/* eslint-env mocha, browser */
'use strict'

const isIPFS = require('is-ipfs')
const CID = require('cids')
const multiaddr = require('multiaddr')
const multibase = require('multibase')
const multicodec = require('multicodec')
const multihash = require('multihashes')
const PeerId = require('peer-id')
const PeerInfo = require('peer-info')
const { expect } = require('interface-ipfs-core/src/utils/mocha')

const IpfsHttpClient = require('../')

describe('exports', () => {
  it('should export the expected types and utilities', () => {
    expect(IpfsHttpClient.isIPFS).to.equal(isIPFS)
    expect(IpfsHttpClient.Buffer).to.equal(Buffer)
    expect(IpfsHttpClient.CID).to.equal(CID)
    expect(IpfsHttpClient.multiaddr).to.equal(multiaddr)
    expect(IpfsHttpClient.multibase).to.equal(multibase)
    expect(IpfsHttpClient.multicodec).to.equal(multicodec)
    expect(IpfsHttpClient.multihash).to.equal(multihash)
    expect(IpfsHttpClient.PeerId).to.equal(PeerId)
    expect(IpfsHttpClient.PeerInfo).to.equal(PeerInfo)
  })
})
