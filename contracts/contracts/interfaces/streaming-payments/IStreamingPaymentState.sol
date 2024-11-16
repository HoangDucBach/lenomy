// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IStreamingPaymentState {
    /// @notice Escrow address
    function escrow() external view returns (address);

    /// @notice Depositor address
    function depositor() external view returns (address);

    /// @notice Recipient address
    function recipient() external view returns (address);

    /// @notice Balance tracking
    function balance() external view returns (uint256);

    /// @notice Flow rate, default money sent per minute
    function flowRate() external view returns (uint256);

    /// @notice Start time
    function startTime() external view returns (uint256);

    /// @notice Last payment timestamp
    function lastPaid() external view returns (uint256);

    /// @notice Check is stream active
    function isActive() external view returns (bool);
}
