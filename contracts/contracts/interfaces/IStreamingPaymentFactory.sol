// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../StreamingPayment.sol";

interface IStreamingPaymentFactory {
    /// @notice Create a new streaming payment
    function createStreamingPayment(
        address _depositor,
        address _recipient,
        uint256 _flowRate
    ) external payable returns (address);

    /// @notice Get streaming payment
    function getStreamingPayment(
        address _streamingPaymentAddress
    ) external view returns (StreamingPayment.StreamPaymentData memory);
}
