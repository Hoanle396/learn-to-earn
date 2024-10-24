// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title LearnToEarn
 * @dev This is a mock ERC20 token for testing purposes.
 */
contract LearnToEarnToken is ERC20 {
    uint constant decimalUnits = 10 ** 18;
    uint constant _initial_supply = 100000000000 * decimalUnits;
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, _initial_supply);
    }

    // Function to allow minting of new tokens (for testing purposes)
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    // Function to allow burning of tokens (for testing purposes)
    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}
