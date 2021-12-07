#! /usr/bin/env node

/*

        AXON Contract Deployment Impl.

*/

async function Deploy(options)
{
  const type = options.type
  const name = options.name
  const symbol = options.symbol

  const chalk = require('chalk')
  const hardhat = require('hardhat')
  const network = hardhat.network.name

  console.log(chalk.yellow(`Preparing to deploy ${type} token ${name} (${symbol}) to network ${network}`))

  const factory = await hardhat.ethers.getContractFactory(type)
  const contract = await factory.deploy(name, symbol, 10000); // 10k = 1 token starting balance

  await contract.deployed()
  console.log(chalk.green('Deployment successful! '))
  console.log('address : ' + chalk.blue(`${contract.address}`))

  return contract.address
}


module.exports = {
  Deploy
}
