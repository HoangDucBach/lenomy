// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenomy Marketplace Actions
interface ILenomyMarketplaceSuperfluidActions {
    /// @notice Start renting stream
    /// @param _learner The address of the learner
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _tokenId The token ID
    function startRentingStream(
        address _learner,
        address _nftCourseAddress,
        uint256 _tokenId
    ) external;

    /// @notice Stop renting stream
    /// @param _learner The address of the learner
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _tokenId The token ID
    function stopRentingStream(
        address _learner,
        address _nftCourseAddress,
        uint256 _tokenId
    ) external;
}
