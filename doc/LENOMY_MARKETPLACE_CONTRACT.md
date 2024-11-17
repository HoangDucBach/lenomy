# Lenomy Marketplace Contract Documentation

The `LenomyMarketplace` contract is a decentralized marketplace for listing, buying, and renting NFT courses represented as ERC-721 tokens. This document provides an overview of the contract's key functionality, modifiers, and events for developers.

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

1. **List NFT Courses**: Creators can list their courses for sale or rent.
2. **Buy NFT Courses**: Learners can securely purchase courses using blockchain transactions.
3. **Rent NFT Courses**: Support for hourly course access (implementation pending).
4. **Dynamic Pricing**: Update or modify course listing prices.
5. **Secure Withdrawals**: Sellers can withdraw their earnings transparently.
6. **Decentralized Trust**: Blockchain ensures trustless transactions.

---

## Contract Address

| **Network** | **Address**                                  |
|-------------|----------------------------------------------|
| Hekla     | *0xfc1Fb4f8C1E111B81a75acA63c5a2470A8d23D24*                            |

---

## Core Functions

### **Listing Functions**

#### `listItem(address _nftCourseAddress, uint256 _tokenId, uint256 _price)`
- Lists an NFT course for sale.
- Emits `ItemsListed` on successful listing.
- Requires:
  - Caller to be the owner of the NFT.
  - NFT approval for the marketplace.
  - A price greater than zero.

#### `cancelListing(address _nftCourseAddress, uint256 _tokenId)`
- Cancels an existing listing.
- Emits `ItemCancelled` on successful cancellation.
- Requires:
  - Caller to be the owner of the NFT.
  - NFT to be listed.

### **Transaction Functions**

#### `buyItem(address _nftCourseAddress, uint256 _tokenId)`
- Allows users to purchase listed NFT courses.
- Emits `ItemBought` on successful purchase.
- Requires:
  - Payment matches or exceeds the listing price.
  - NFT approval for the marketplace.

#### `rentItem(address _nftCourseAddress, uint256 _tokenId)`
- Placeholder function for renting courses (implementation pending).

#### `returnItem(address _nftCourseAddress, uint256 _tokenId)`
- Placeholder function for returning rented courses (implementation pending).

### **Management Functions**

#### `updateListingPrice(address _nftCourseAddress, uint256 _tokenId, uint256 _price)`
- Updates the price of an existing listing.
- Requires:
  - Caller to be the owner of the NFT.
  - NFT to be listed.

#### `withdraw()`
- Allows sellers to withdraw proceeds.
- Requires:
  - The caller has proceeds to withdraw.

---

## Modifiers

### `isOwner(address _nftCourseAddress, uint256 _tokenID)`
- Ensures the caller is the owner of the specified NFT.

### `isCreator(address _nftCourseAddress)`
- Ensures the caller is the creator of the NFT.

### `notListed(address _nftCourseAddress, uint256 _tokenId)`
- Ensures the NFT is not already listed.

---

## Error Handling

| **Error**                       | **Description**                                         |
|----------------------------------|---------------------------------------------------------|
| `PriceNotMet`                   | Payment is less than the listed price.                  |
| `ItemNotForSale`                | NFT is not listed for sale.                             |
| `NotListed`                     | NFT is not listed.                                      |
| `AlreadyListed`                 | NFT is already listed.                                  |
| `NoProceeds`                    | Caller has no proceeds to withdraw.                    |
| `NotOwner`                      | Caller is not the owner of the NFT.                    |
| `NotCreator`                    | Caller is not the creator of the NFT.                  |
| `NotApprovedForMarketplace`     | NFT is not approved for the marketplace.               |
| `PriceMustBeAboveZero`          | Listing price is zero.                                  |

---

## Events

| **Event**           | **Description**                                              |
|---------------------|--------------------------------------------------------------|
| `ItemsListed`       | Emitted when an NFT is listed.                               |
| `ItemCancelled`     | Emitted when a listing is canceled.                          |
| `ItemBought`        | Emitted when an NFT is purchased.                            |

---

## License

This contract is licensed under the MIT License. See the `LICENSE` file for more information.
