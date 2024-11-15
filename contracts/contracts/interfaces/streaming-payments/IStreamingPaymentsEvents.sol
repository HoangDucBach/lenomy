// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IStreamingPaymentEvents {
    /// @notice Emit when a stream is created
    /// @param sender The sender of the stream
    /// @param recipient The recipient of the stream
    /// @param amount The amount to send per second
    event StreamCreated(
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );

    /// @notice Emit when a stream is stopped
    /// @param recipient The recipient of the stream
    event StreamStopped(address indexed recipient);

    /// @notice Emit when a stream is updated
    /// @param recipient Address of the recipient
    /// @param newAmount New amount to send per second
    event StreamUpdated(address indexed recipient, uint256 newAmount);
}
