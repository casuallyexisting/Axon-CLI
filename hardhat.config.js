/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { PRIVATE, DEVCHAIN } = process.env;


module.exports = {
  solidity: "0.8.3",

  defaultNetwork: 'dev',
  networks: {
      hardhat: {},
      localhost: {},
      dev: {
        url: DEVCHAIN,
        accounts: [`${PRIVATE}`]
      }
  }
};
