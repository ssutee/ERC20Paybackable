// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract ERC20Paybackable is Ownable, ERC20 {

    function payback(address _to, address _token, uint256 _amount) external onlyOwner {
        require(_to != address(0) && _token != address(0), "Invalid address");
        IERC20(_token).transfer(_to, _amount);
    }    

}