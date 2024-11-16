// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/IStreamPayment.sol";

error AmountMustBeGreaterThanZero();
error OnlySenderCanStopStream();
error OnlySenderCanUpdateStream();
error NewAmountMustBeGreaterThanZero();
error StreamNotFound();
error StreamAlreadyExists();
error StreamNotActive();
error InfficientFunds();
error InvalidAddress();

contract StreamingPayment is IStreamingPayment, AccessControl {
    /// @notice Escrow role, manages the locked funds
    bytes32 public constant ESCROW_ROLE = keccak256("ESCROW_ROLE");

    /// @notice Depositor role, the depositor can deposit and withdraw funds
    bytes32 public constant DEPOSITOR_ROLE = keccak256("DEPOSITOR_ROLE");

    /// @notice Default interval for payment is 1 minute
    uint256 public constant DEFAULT_INTERVAL = 1 minutes;

    /// @notice Stream Payment data
    struct StreamPaymentData {
        address depositor;
        address recipient;
        uint256 flowRate;
        uint256 startTime;
        uint256 balance;
        bool isActive;
    }

    /// @inheritdoc IStreamingPaymentState
    address public override depositor;

    /// @inheritdoc IStreamingPaymentState
    address public override recipient;

    /// @inheritdoc IStreamingPaymentState
    uint256 public override flowRate;

    /// @inheritdoc IStreamingPaymentState
    uint256 public override startTime;

    /// @inheritdoc IStreamingPaymentState
    address public override escrow;

    /// @inheritdoc IStreamingPaymentState
    uint256 public override balance;

    /// @inheritdoc IStreamingPaymentState
    uint256 public override lastPaid;

    /// @inheritdoc IStreamingPaymentState
    bool public override isActive;

    receive() external payable {
        balance += msg.value;
    }

    fallback() external payable {
        balance += msg.value;
    }

    constructor(
        address _depositor,
        address _recipient,
        address _escrow,
        uint256 _flowRate
    ) payable {
        if (
            _escrow == address(0) ||
            _depositor == address(0) ||
            _recipient == address(0)
        ) {
            revert InvalidAddress();
        }

        if (_flowRate <= 0) {
            revert AmountMustBeGreaterThanZero();
        }

        if (msg.value == 0) {
            revert AmountMustBeGreaterThanZero();
        }

        _grantRole(ESCROW_ROLE, msg.sender);
        _grantRole(DEPOSITOR_ROLE, _depositor);

        depositor = _depositor;
        recipient = _recipient;
        flowRate = _flowRate;
        startTime = block.timestamp;
        isActive = true;
        balance = msg.value;
        lastPaid = block.timestamp;
    }

    /// @inheritdoc IStreamingPaymentActions
    function start() external override onlyRole(ESCROW_ROLE) {
        startTime = block.timestamp;
        isActive = true;
    }

    /// @inheritdoc IStreamingPaymentActions
    function stop() external override onlyRole(ESCROW_ROLE) {
        if (!isActive) {
            revert StreamNotActive();
        }

        isActive = false;
    }

    /// @inheritdoc IStreamingPaymentActions
    function pause() external override onlyRole(ESCROW_ROLE) {
        if (!isActive) {
            revert StreamNotActive();
        }

        isActive = false;
    }

    /// @inheritdoc IStreamingPaymentActions
    function unpause() external override onlyRole(ESCROW_ROLE) {
        if (isActive) {
            revert StreamNotActive();
        }

        isActive = true;
    }

    /// @inheritdoc IStreamingPaymentActions
    function pay() external payable override onlyRole(ESCROW_ROLE) {
        if (!isActive) {
            revert StreamNotActive();
        }

        uint256 timeElapsed = block.timestamp - lastPaid;
        uint256 payment = (timeElapsed * flowRate) / DEFAULT_INTERVAL;

        if (balance < payment) {
            revert InfficientFunds();
        }

        payable(recipient).transfer(payment);

        balance -= payment;
        lastPaid = block.timestamp;
    }

    function withdraw() external payable override onlyRole(DEPOSITOR_ROLE) {
        if (!isActive) {
            revert StreamNotActive();
        }

        payable(depositor).transfer(balance);

        balance = 0;
    }
}
