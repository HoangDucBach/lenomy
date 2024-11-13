// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenomy Marketplace Actions
interface ILenomyMarketplaceActions {
    /// @notice List item for sale
    /// @param  _nftCourseAddress The address of the NFT course
    /// @param _tokenId The token ID of the item
    /// @param _price The price of the item
    function listItem(
        address _nftCourseAddress,
        uint256 _tokenId,
        uint256 _price
    ) external;

    /// @notice Cancel listing
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _tokenId The token ID of the item
    function cancelListing(
        address _nftCourseAddress,
        uint256 _tokenId
    ) external;

    /// @notice Buy item
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _tokenId The token ID of the item
    function buyItem(
        address _nftCourseAddress,
        uint256 _tokenId
    ) external payable;

    /// @notice Update listing price
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _tokenId The token ID of the item
    /// @param _price The price of the item
    function updateListingPrice(
        address _nftCourseAddress,
        uint256 _tokenId,
        uint256 _price
    ) external;

    /// @notice Get the listing price
    /// @param _nftCourseAddress The address of the NFT course
    function getListingPrice(
        address _nftCourseAddress
    ) external view returns (uint256);

    /// @notice Withdraw proceeds
    function withdraw() external;
}
