#! /usr/bin/env node

/*

        AXON Network Command Line Interface

*/

const { Command } = require('commander')
const fs = require('fs/promises')
const path = require('path')
const hardhat = require('hardhat')
const chalk = require('chalk')

const { Compile } = require('./compile')
const { Deploy } = require('./deploy')
const { Mint } = require('./mint')
const { Burn } = require('./burn')

async function main()
{
  const program = new Command()

  // Command Definitions
  program
      .command('compile')
      .description('Compiles all Solidity contracts in "contracts"')
      .action(Compile)

  program
      .command('deploy')
      .description('create a new NFT from an image file')
      .option('-t, --type <type>', 'Token Type - See Docs', 'ERC_20')
      .option('-n, --name <name>', 'Token Full Name', 'Testcoin')
      .option('-s, --symbol <symbol>', 'Token Symbol (3-5 chars)', 'TST')
      .action(Deploy)

  program
      .command('mint')
      .description('Mints tokens on given contract')
      .option('-c, --contract <addr>', 'Token Type - See Docs')
      .option('-t, --type <type>', 'Token Type - See Docs', 'ERC_20')
      .option('-a, --addr <addr>', 'Token Symbol (3-5 chars)')
      .option('-q --quantity <amount>', 'Token Symbol (3-5 chars)', 1e4)
      .action(Mint)

  program
      .command('burn')
      .description('Burns tokens on given contract')
      .option('-c, --contract <addr>', 'Token Type - See Docs')
      .option('-t, --type <type>', 'Token Type - See Docs', 'ERC_20')
      .option('-a, --addr <addr>', 'Token Symbol (3-5 chars)')
      .option('-q --quantity <amount>', 'Token Symbol (3-5 chars)', 1e4)
      .action(Burn)


    // Reset Active Directory
    const rootDir = path.join(__dirname, '..')
    process.chdir(rootDir)

    await program.parseAsync(process.argv)
}

main().then(() => {
    process.exit(0)
}).catch(err => {
    console.error(err)
    process.exit(1)
})
