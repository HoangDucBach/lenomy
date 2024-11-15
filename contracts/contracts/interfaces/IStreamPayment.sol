// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./streaming-payments/IStreamingPaymentsActions.sol";
import "./streaming-payments/IStreamingPaymentsState.sol";
import "./streaming-payments/IStreamingPaymentsEvents.sol";

/// @title The interface for the Streaming Payments contract
interface IStreamingPayment is
    IStreamingPaymentActions,
    IStreamingPaymentState,
    IStreamingPaymentEvents
{

}
