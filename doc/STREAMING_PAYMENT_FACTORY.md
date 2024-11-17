# Streaming Payment Factory Contract Documentation

The `StreamingPaymentFactory` contract facilitates the creation and management of streaming payment agreements. It supports multiple payment streams, where users can deposit funds and have them streamed to recipients over time.

---

## Table of Contents

- [Key Features](#key-features)
- [Contract Address](#contract-address)
- [Core Functions](#core-functions)
- [Modifiers](#modifiers)
- [Error Handling](#error-handling)
- [Events](#events)
- [License](#license)

---

## Key Features

1. **Stream Payments**: Enable automated streaming of payments between a depositor and recipient based on a specified flow rate.
2. **Batch Processing**: Process all active streaming payments in one transaction.
3. **Payment Tracking**: Retrieve details of any streaming payment agreement.
4. **Fund Management**: Supports receiving and processing ETH for streaming payments.

---

## Contract Address

| **Network** | **Address**       |
|-------------|-------------------|
| Hekla       | *0x3c4390fFE0C8fC13AA9d8F6c823285378a6D8649* |

---

## Core Functions

### **Streaming Payment Management**

#### `createStreamingPayment(address _depositor, address _recipient, uint256 _flowRate) external payable returns (address)`
- Creates a new streaming payment contract with the specified depositor, recipient, and flow rate.
- Emits `StreamingPaymentCreated` on successful creation.
- Requires:
  - The caller to provide an initial deposit greater than zero (`msg.value > 0`).

#### `getStreamingPayment(address _streamingPaymentAddress) external view returns (StreamingPayment.StreamPaymentData memory)`
- Retrieves the data of a specific streaming payment agreement.
- Returns:
  - `StreamPaymentData` structure containing payment details.

### **Process Payments**

#### `process() external`
- Iterates through all active streaming payments and triggers their `pay` function.
- Allows batch processing to distribute funds to recipients.

### **Fallback Functions**

- **`receive()`**: Accepts ETH deposits sent directly to the contract.
- **`fallback()`**: Handles fallback calls for unmatched function signatures.

---

## Modifiers

This contract does not utilize custom modifiers.

---

## Error Handling

| **Error**                                    | **Description**                                     |
|----------------------------------------------|---------------------------------------------------|
| `StreamingPaymentFactoryCreateStreamingPaymentError` | Thrown when there is an issue creating a payment. |
| `StreamingPaymentFactoryGetStreamingPaymentError`    | Thrown when retrieving payment data fails.        |
| `NotEnoughFunds`                             | Thrown when insufficient funds are provided.      |

---

## Events

| **Event**                | **Description**                                                             |
|--------------------------|-----------------------------------------------------------------------------|
| `StreamingPaymentCreated` | Emitted when a new streaming payment agreement is successfully created.    |

---

## Data Structures

### **StreamPaymentData**
The `StreamingPayment.StreamPaymentData` structure stores metadata for each payment agreement:

| **Field**        | **Type**   | **Description**                                  |
|------------------|------------|--------------------------------------------------|
| `depositor`      | `address`  | Address of the depositor.                        |
| `recipient`      | `address`  | Address of the recipient.                        |
| `flowRate`       | `uint256`  | Rate of streaming payment per second.            |
| `startTime`      | `uint256`  | Timestamp when the stream started.               |
| `balance`        | `uint256`  | Remaining balance in the streaming payment.      |
| `isActive`       | `bool`     | Indicates whether the stream is currently active.|

---

## License

This contract is licensed under the MIT License. See the `LICENSE` file for more details.
