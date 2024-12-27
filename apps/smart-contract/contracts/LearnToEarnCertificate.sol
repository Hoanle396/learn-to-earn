// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract LearnToEarnCertificate is ERC721Upgradeable, OwnableUpgradeable {
    mapping(address => bool) private admin;
    uint256 public serviceFee;
    uint256 private counter;
    uint256 private userAnswerCount;
    uint256 private nextPool;

    struct PoolCreated {
        string name;
        uint256 startDate;
        uint256 endDate;
        address admin;
        bool ended;
        string[] questions;
        string[] answers;
        uint256 passedScore;
    }
    struct QuizQuestion {
        string question;
        string answer;
    }
    struct UserAnswer {
        address user;
        uint256 poolId;
        QuizQuestion[] answers;
    }

    mapping(uint256 => PoolCreated) private pools;
    mapping(uint256 => UserAnswer) private userAnswers;

    event PoolCreatedEvent(uint256 id, string name, uint256 startDate, uint256 endDate, bool end, string[] questions);
    event LearnToEarnCertificateCreated(address indexed receipt, uint256 id, uint256 poolId);
    event QuizQuestionCreated(address indexed user, uint256 poolId, string question, string answer);
    event PoolEnded(uint256 id);

    error OnlyAdminCanCall(address caller);
    error IValidCaller(address caller);
    error PoolIsNotEndedYet();
    error PoolIsEnded();
    error UserJoinedPoolBefore();
    error InValidLengthAnswers();

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
        counter = 0;
        userAnswerCount = 0;
        nextPool = 1;
        serviceFee = 0.01 ether;
    }

    function mint(address _recipient, uint256 poolId) private {
        uint256 currentId = counter++;
        _mint(_recipient, currentId);
        emit LearnToEarnCertificateCreated(_recipient, currentId, poolId);
    }

    function createPool(
        string memory _name,
        uint256 _startDate,
        uint256 _endDate,
        string[] memory _questions,
        uint256 _passedScore
    ) external onlyAdmin {
        string[] memory answer = new string[](0);
        pools[nextPool] = PoolCreated(_name, _startDate, _endDate, msg.sender, false, _questions, answer, _passedScore);
        nextPool++;
        emit PoolCreatedEvent(nextPool, _name, _startDate, _endDate, false, _questions);
    }

    function submitAnswer(uint256 _poolId, string[] memory _answers) external payable {
        require(msg.value == serviceFee, "Service fee is required");
        if (pools[_poolId].questions.length != _answers.length) revert InValidLengthAnswers();
        if (pools[_poolId].admin == msg.sender) revert IValidCaller(msg.sender);
        if (pools[_poolId].ended) revert PoolIsEnded();

        for (uint256 i = 0; i <= userAnswerCount; i++) {
            if (userAnswers[i].poolId == _poolId && userAnswers[i].user == msg.sender) revert UserJoinedPoolBefore();
        }

        payable(msg.sender).transfer(msg.value);
        QuizQuestion[] memory answers = new QuizQuestion[](_answers.length);
        for (uint256 i = 0; i < _answers.length; i++) {
            answers[i] = QuizQuestion(pools[_poolId].questions[i], _answers[i]);
        }
        userAnswers[userAnswerCount] = UserAnswer(msg.sender, _poolId, answers);

        userAnswerCount++;
    }

    function drawPool(uint256 _poolId, string[] memory answers) external onlyAdmin {
        if (pools[_poolId].admin != msg.sender) revert IValidCaller(msg.sender);
        if (block.timestamp < pools[_poolId].endDate) revert PoolIsNotEndedYet();
        pools[_poolId].ended = true;
        pools[_poolId].answers = answers;
        emit PoolEnded(_poolId);
        checkAnswers(_poolId, answers);
    }

    function checkAnswers(uint256 _poolId, string[] memory answers) private {
        for (uint256 i = 0; i < userAnswerCount; i++) {
            if (userAnswers[i].poolId == _poolId) {
                uint256 correctAnswers = 0;
                for (uint256 j = 0; j < userAnswers[i].answers.length; j++) {
                    if (
                        keccak256(abi.encodePacked(userAnswers[i].answers[j].answer)) ==
                        keccak256(abi.encodePacked(answers[j]))
                    ) {
                        correctAnswers++;
                    }
                }
                if (correctAnswers >= pools[_poolId].passedScore) {
                    mint(userAnswers[i].user, _poolId);
                }
            }
        }
    }
}
