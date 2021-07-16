// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BarToken is ERC20("Bar Token", "BAR"), ERC20Burnable, Ownable {
    constructor() public {}

    // Mint DOLLAR. Can be used by Pool only
    function mint(address _address, uint256 _amount) external onlyOwner {
        _mint(_address, _amount);
    }
}