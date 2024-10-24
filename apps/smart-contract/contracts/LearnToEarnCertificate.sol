// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LearnToEarnCertificate is OwnableUpgradeable {
    struct Certificate {
        address recipient;
        string title;
        string dateIssued;
        string score;
        string additionalInfo;
    }

    mapping(address => Certificate) private certificates;
    mapping(address => bool) private admin;

    event CertificateIssued(
        address indexed recipient,
        string title,
        string dateIssued,
        string score,
        string additionalInfo
    );
    
    modifier onlyAdmin() {
        require(admin[msg.sender] == true, "Only admin can call this function");
        _;
    }

    function setAdmin(address _admin) external onlyOwner {
        admin[_admin] = true;
    }

    function initialize() public initializer {
        __Ownable_init();
    }

    function issueCertificate(
        address _recipient,
        string memory _title,
        string memory _dateIssued,
        string memory _score,
        string memory _additionalInfo
    ) public onlyAdmin {
        certificates[_recipient] = Certificate(_recipient, _title, _dateIssued, _score, _additionalInfo);
        emit CertificateIssued(_recipient, _title, _dateIssued, _score, _additionalInfo);
    }

    function getCertificate(address _recipient) public view returns (Certificate memory) {
        return certificates[_recipient];
    }
}
