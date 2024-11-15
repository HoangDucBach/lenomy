// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IStreamingPaymentState {
    // @notice Depositor address
    function depositor() external view returns (address);

    // @notice Recipient address
    function recipient() external view returns (address);

    // @notice Unit amount
    function unitAmount() external view returns (uint256);
}
