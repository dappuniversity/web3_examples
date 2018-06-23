 const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')

const account1 = '0xa61d7733659706312c85bd47a36deca10e6ab06c'
const account2 = '0x2cb3b5de783e96dd7ebbdf65e2f722df5129dc78'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Why do we use a nonce here?

  const params = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(25000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to:       account2,
    from:     account1,
    value:    web3.utils.toHex(web3.utils.toWei('1', 'ether'))
  }

  const tx = new Tx(params)

  tx.sign(privateKey1)

  const raw = '0x' + tx.serialize().toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
  }).then((txReceipt) => {
    console.log('txReceipt:', txReceipt)
    return web3.eth.getBalance(account1)
  }).then((balance1) => {
    console.log('balance1:', web3.utils.fromWei(balance1, 'ether'))
    return web3.eth.getBalance(account2)
  }).then((balance2) => {
    console.log('balance2:', web3.utils.fromWei(balance2, 'ether'))
  })
})

// rawTx.sign(privateKey1)
// const serializedTx = tx.Serialize()
// console.log(serializedTx.toString('hex'))

// const tx = new Tx()

// console.log({
//   ethereumTX: TX,
//   account1: account1,
//   account2: account2
// })

// const contract = Web3

// const account1 = '0x33a75943Ca7Ed31C66199FE851AeaF0A758837E3'
// const account2 = '0x7FFDdea466e00d0082EE198Ee84A0Ce8d232C7cD'

// const Web3 = require('web3')

// const rpcURL = 'https://mainnet.infura.io/hqRzEqFKv6IsjRxfVUWH'
// const web3   = new Web3(rpcURL)

// const account1 = '0xeceae35e5d772a21b8d4b41ae710e204dcff9f2c'
// const account2 = '0xfa53361a43f613400c5a489031e4ae9dae23ed98'

// web3.eth.getGasPrice((err, result) => {
//   console.log("Gas Price", result)
// })
