// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IStreaming {
    /// @notice Process the stream
    /// Using Chainlink Time-based Upkeep to call this function,
    /// which will process the stream of all streaming payments
    function process() external;
}
