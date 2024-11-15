// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IStreamingPaymentActions {
    /// @notice Create a new stream
    /// @param recipient The address of the recipient
    /// @param amount The amount to send per second
    function createStream(address recipient, uint256 amount) external payable;

    /// @notice Stop a stream
    /// @param recipient The address of the recipient
    function stopStream(address recipient) external;

    /// @notice Update a stream
    /// @param recipient Address of the recipient
    /// @param newAmount New amount to send per second
    function updateStream(
        address recipient,
        uint256 newAmount
    ) external payable;

    /// @notice Withdraw the balance of the stream
    function withdraw() external payable;
}
