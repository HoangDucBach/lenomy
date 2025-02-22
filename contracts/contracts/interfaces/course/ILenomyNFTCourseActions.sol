// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenomy Course Actions
interface ILenomyNFTCourseActions {
    /// @notice Access the course content
    /// Learner access the course content, if pass the access control
    function accessCourse() external;

    /// @notice Mint the access control to the learner (using as token)
    /// @param learner The address of the learner
    function mint(address learner) external;
}
