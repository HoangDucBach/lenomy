// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenony Course State
interface ILenomyNFTCourseState {
    /// @notice Creator
    /// @dev This value can overflow the 32 bytes
    function creator() external view returns (address);

    /// @notice Description of the course
    /// @dev This value can overflow the 32 bytes
    function description() external view returns (string memory);

    /// @notice Price of the course
    function price() external view returns (uint256);

    /// @notice Encrypt CID of the course content on IPFS
    /// Only owner can know the CID, all learners buy the course without knowing the CID, 
    /// they will access the view content through the contract (if pass access control)
    function encryptedCID() external view returns (string memory);
}
