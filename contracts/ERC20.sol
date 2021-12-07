pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract ERC_20 is ERC20, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

  constructor(
    string memory tokenName,
    string memory tokenSymbol,
    uint256 initialSupply
    )
      ERC20(tokenName, tokenSymbol)
      public
  {
    // Mint Tokens
    _mint(msg.sender, initialSupply);
    // Grand admin role
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    _setupRole(BURNER_ROLE, msg.sender);
  }
  // Minting Function (Minters only)
  function mint(address to, uint256 amount) public {
    require(hasRole(MINTER_ROLE, msg.sender), "DOES_NOT_HAVE_MINTER_ROLE");
    _mint(to, amount);
  }
  // Burning Function (Burners Only)
  function burn(address from, uint256 amount) public {
    require(hasRole(BURNER_ROLE, msg.sender), "DOES_NOT_HAVE_BURNER_ROLE");
    _burn(from, amount);
  }

  // Set decimals
  function decimals() public view virtual override returns (uint8) {
      return 4;
  }
}
