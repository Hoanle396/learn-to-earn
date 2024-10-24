//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LearnToEarn is ERC20 {
    uint constant decimalUnits = 10 ** 18;
    uint constant _initial_supply = 100000000000 * decimalUnits;

    constructor() public ERC20("LearnToEarn", "L2E") {
        _mint(msg.sender, _initial_supply);
    }
}
