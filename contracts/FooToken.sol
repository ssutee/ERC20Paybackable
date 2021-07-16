// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./ERC20Paybackable.sol";

contract FooToken is ERC20("Foo Token", "FOO"), ERC20Paybackable {
    constructor() public {}

    // Mint DOLLAR. Can be used by Pool only
    function mint(address _address, uint256 _amount) external onlyOwner {
        _mint(_address, _amount);
    }
}