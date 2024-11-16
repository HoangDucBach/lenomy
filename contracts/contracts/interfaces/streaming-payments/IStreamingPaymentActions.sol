// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IStreamingPaymentActions {
    /// @notice Start a stream
    function start() external;

    /// @notice Stop a stream
    function stop() external;

    /// @notice Pause a stream
    function pause() external;

    /// @notice Unpause a stream
    function unpause() external;

    /// @notice Pay the stream
    function pay() external payable;

    /// @notice Withdraw the remaining unused amount
    function withdraw() external payable;
}
