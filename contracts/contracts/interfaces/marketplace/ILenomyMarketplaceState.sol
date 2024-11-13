// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenomy Marketplace State
interface ILenomyMarketplaceState {
    struct Listing {
        uint256 price;
        address seller;
    }
}
