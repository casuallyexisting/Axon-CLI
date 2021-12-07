#! /usr/bin/env node

/*

        AXON Contract Token Burning Impl.

*/

const chalk = require('chalk')

async function Burn(options)
{
  var contract = options.contract
  var type = options.type
  var addr = options.addr
  var quantity = options.quantity

  if (contract.startsWith("env."))
  {
    contract = contract.replace('env.', '')
    contract = process.env[contract]
  }

  if (addr.startsWith("env."))
  {
    addr = addr.replace('env.', '')
    addr = process.env[addr]
  }

  const hardhat = require("hardhat");
  const network = hardhat.network.name

  console.log(chalk.yellow(`Preparing to burn on ${type} contract ${contract} on network ${network}`))
  console.log(chalk.yellow(`Account  : ${addr}`))
  console.log(chalk.yellow(`Quantity : ${quantity}`))

  switch (type)
  {
    case "ERC_20":
      await _burnERC20(hardhat, contract, addr, quantity)
      return
    default:
      console.err("Invalid type for function Burn")
      return;
  }

  return true
}


async function _burnERC20(hardhat, contractAddr, addr, quantity)
{
  const contract = await hardhat.ethers.getContractAt("ERC_20", contractAddr)
  const tx = await contract.burn(addr, quantity)
  const receipt = await tx.wait()
  console.log(chalk.green('Burn successful! '))
  console.log('Block   : ' + chalk.blue(`${receipt.events[0].blockNumber}`))
  console.log('Tx Hash : ' + chalk.blue(`${receipt.events[0].transactionHash}`))
}


module.exports = {
  Burn
}
