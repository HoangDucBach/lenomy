// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./streaming-payments/IStreamingPaymentActions.sol";
import "./streaming-payments/IStreamingPaymentState.sol";
import "./streaming-payments/IStreamingPaymentEvents.sol";

/// @title The interface for the Streaming Payments contract
interface IStreamingPayment is
    IStreamingPaymentActions,
    IStreamingPaymentState,
    IStreamingPaymentEvents
{

}
