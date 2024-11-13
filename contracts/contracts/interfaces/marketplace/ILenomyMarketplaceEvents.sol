// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenomy Marketplace
interface ILenomyMarketplaceEvents {
    /// @notice Emitted when a new listing is created
    event ItemsListed(
        address indexed seller,
        address indexed nftCourseAddress,
        uint256 tokenId,
        uint256 price
    );

    /// @notice Emitted when a listing is removed
    event ItemCancelled(
        address indexed seller,
        address indexed nftCourseAddress,
        uint256 tokenId
    );

    /// @notice Emitted when an item is bought
    event ItemBought(
        address indexed buyer,
        address indexed nftCourseAddress,
        uint256 tokenId,
        uint256 price
    );
}
