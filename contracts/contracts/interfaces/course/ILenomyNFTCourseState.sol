// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenomy Course State
interface ILenomyNFTCourseState {
    /// @notice Enum for priveleges role
    /// Ownership: Owner of the course
    /// Renting: Learner who rent the course
    enum PrivilegesRole {
        Ownership,
        Renting
    }

    /// @notice Creator
    /// @dev This value can overflow the 32 bytes
    function creator() external view returns (address);

    /// @notice Description of the course
    /// @dev This value can overflow the 32 bytes
    function description() external view returns (string memory);

    /// @notice Encrypt CID of the course content on IPFS
    /// Only owner can know the CID, all learners buy the course without knowing the CID,
    /// they will access the view content through the contract (if pass access control)
    function encryptedCID() external view returns (string memory);

    /// @notice Get next token id
    function nextTokenId() external view returns (uint256);

    /// @notice Price of the course (for buying)
    function price() external view returns (uint256);

    /// @notice Get rental price per second (for renting)
    function rentalUnitPrice() external view returns (uint256);

    /// @notice Get rental period in seconds (for renting)
    function rentalUnitTimestamp() external view returns (uint256);

    /// @notice Mapping learner address to priveleges role
    function learnerPrivileges(address) external view returns (PrivilegesRole);
}
