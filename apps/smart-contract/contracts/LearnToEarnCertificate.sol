// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract LearnToEarnCertificate is ERC721Upgradeable, OwnableUpgradeable {
    mapping(address => bool) private admin;
    uint256 private counter = 0;

    event LearnToEarnCertificateCreated(address indexed reciptient, uint256 id);

    error OnlyAdminCanCall(address caller);

    modifier onlyAdmin() {
        if (!admin[msg.sender]) revert OnlyAdminCanCall(msg.sender);
        _;
    }

    function setAdmin(address _admin) external onlyOwner {
        admin[_admin] = true;
    }

    function initialize() public initializer {
        __Ownable_init();
        __ERC721_init("Learn to Earn Certificate", "L2E");
    }

    function mint(address _recipient) public onlyAdmin {
        uint256 currentId = counter++;
        _mint(_recipient, currentId);
        emit LearnToEarnCertificateCreated(_recipient, currentId);
    }
}
