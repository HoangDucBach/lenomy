// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IStreamingPaymentEvents {
    /// @notice Emitted when a stream is started
    event StreamStarted(
        address indexed sender,
        uint256 indexed amount,
        uint256 indexed startTime
    );

    /// @notice Emitted when a stream is stopped
    event StreamStopped(
        address indexed sender,
        uint256 indexed amount,
        uint256 indexed stopTime
    );

    /// @notice Emitted when a stream is paused
    event StreamPaused(
        address indexed sender,
        uint256 indexed amount,
        uint256 indexed pauseTime
    );

    /// @notice Emitted when a stream is unpaused
    event StreamUnpaused(
        address indexed sender,
        uint256 indexed amount,
        uint256 indexed unpauseTime
    );

    /// @notice Emitted when a stream is paid
    event StreamPaid(
        address indexed sender,
        uint256 indexed amount,
        uint256 indexed payTime
    );

    /// @notice Emitted when a stream is withdrawn
    event StreamWithdrawn(
        address indexed sender,
        uint256 indexed amount,
        uint256 indexed withdrawTime
    );
}
