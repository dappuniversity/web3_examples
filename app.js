var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/hqRzEqFKv6IsjRxfVUWH')

const account1 = '0x33a75943Ca7Ed31C66199FE851AeaF0A758837E3'
const account2 = '0x7FFDdea466e00d0082EE198Ee84A0Ce8d232C7cD'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')
