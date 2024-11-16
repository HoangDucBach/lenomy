// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interfaces/streaming-payments/IStreaming.sol";
import "./interfaces/IStreamingPaymentFactory.sol";
import "./StreamingPayment.sol";

error StreamingPaymentFactoryCreateStreamingPaymentError();
error StreamingPaymentFactoryGetStreamingPaymentError();
error NotEnoughFunds();

contract StreamingPaymentFactory is IStreaming, IStreamingPaymentFactory {
    /// @notice All streaming payments
    mapping(address => StreamingPayment.StreamPaymentData)
        public streamingPayments;

    /// @notice All streaming payment addresses
    address[] public streamingPaymentAddresses;

    /// @notice Emit when a new streaming payment is created
    event StreamingPaymentCreated(
        address indexed _streamingPaymentAddress,
        StreamingPayment.StreamPaymentData _streamPaymentData
    );

    /// @notice Allow contract to receive ETH
    receive() external payable {}

    /// @notice Fallback function
    fallback() external payable {}

    /// @inheritdoc IStreaming
    function process() external override {
        address[] memory paymentAddresses = streamingPaymentAddresses;
        for (uint256 i = 0; i < paymentAddresses.length; i++) {
            StreamingPayment paymentContract = StreamingPayment(
                payable(paymentAddresses[i])
            );

            paymentContract.pay();
        }
    }

    /// @inheritdoc IStreamingPaymentFactory
    function createStreamingPayment(
        address _depositor,
        address _recipient,
        uint256 _flowRate
    ) external payable override returns (address) {
        if (msg.value <= 0) {
            revert AmountMustBeGreaterThanZero();
        }

        StreamingPayment.StreamPaymentData
            memory _streamPaymentData = StreamingPayment.StreamPaymentData(
                _depositor,
                _recipient,
                _flowRate,
                block.timestamp,
                msg.value,
                true
            );

        StreamingPayment streamingPayment = new StreamingPayment{
            value: msg.value
        }(_depositor, _recipient, address(this), _flowRate);

        streamingPayment.start();

        streamingPayments[address(streamingPayment)] = _streamPaymentData;

        streamingPaymentAddresses.push(address(streamingPayment));

        emit StreamingPaymentCreated(
            address(streamingPayment),
            _streamPaymentData
        );

        return address(streamingPayment);
    }

    /// @inheritdoc IStreamingPaymentFactory
    function getStreamingPayment(
        address _streamingPaymentAddress
    )
        external
        view
        override
        returns (StreamingPayment.StreamPaymentData memory)
    {
        return streamingPayments[_streamingPaymentAddress];
    }
}
