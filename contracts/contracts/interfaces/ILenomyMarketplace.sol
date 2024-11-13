/// @notice SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface ILenomyMarketplace {
    /// @notice List item for sale
    /// @param  _nftCourseAddress The address of the NFT course
    /// @param _price The price of the item
    function listItem(address _nftCourseAddress, uint256 _price) external;

    /// @notice Cancel listing
    /// @param _nftCourseAddress The address of the NFT course
    function cancelListing(address _nftCourseAddress) external;

    /// @notice Buy item
    /// @param _nftCourseAddress The address of the NFT course
    function buyItem(address _nftCourseAddress) external payable;

    /// @notice Update listing price
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _price The price of the item
    function updateListingPrice(
        address _nftCourseAddress,
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
