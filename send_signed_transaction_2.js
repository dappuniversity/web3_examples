var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/hqRzEqFKv6IsjRxfVUWH')

const account1 = '0x33a75943Ca7Ed31C66199FE851AeaF0A758837E3'
const account2 = '0x7FFDdea466e00d0082EE198Ee84A0Ce8d232C7cD'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getBalance(account2, (err, bal) => {
  console.log(web3.utils.fromWei(bal, 'ether'))
})

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
