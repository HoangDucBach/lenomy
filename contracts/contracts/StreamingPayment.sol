// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interfaces/IStreamPayment.sol";

error AmountMustBeGreaterThanZero();
error OnlySenderCanStopStream();
error OnlySenderCanUpdateStream();
error NewAmountMustBeGreaterThanZero();
error StreamNotFound();

contract StreamingPayment is IStreamingPayment {
    /// @notice Stream Payment data
    struct StreamPayment {
        address depositor;
        address recipient;
        uint256 amount;
        uint256 startTime;
    }

    /// @inheritdoc IStreamingPaymentActions
    function createStream(
        address recipient,
        uint256 amount
    ) external payable override {}

    /// @inheritdoc IStreamingPaymentActions
    function stopStream(address recipient) external override onlySender {}

    /// @inheritdoc IStreamingPaymentActions
    function updateStream(
        address recipient,
        uint256 newAmount
    ) external payable override onlySender {}

    /// @inheritdoc IStreamingPaymentState
    function getStreamAmount(
        address recipient
    ) external view override returns (uint256) {}

    /// @inheritdoc IStreamingPaymentState
    function getStreamBalance(
        address recipient
    ) external view override returns (uint256) {}

    /// @inheritdoc IStreamingPaymentState
    function hasActiveStream(
        address recipient
    ) external view override returns (bool) {
        return streams[recipient] > 0;
    }

    /// @notice Check sender
    modifier onlySender() {
        require(msg.sender == tx.origin, "Only sender can call this function");
        _;
    }

    function withdraw() external payable override onlySender {}
}
