// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenony Course Actions
interface ILenomyNFTCourseActions {
    /// @notice Buy the course
    /// Learner buy the access to the course content, but won't know the CID of the content
    function buyCourse() external payable;

    /// @notice Access the course content
    /// Learner access the course content, if pass the access control
    function accessCourse() external;

    /// @notice Mint the access control to the learner (using as token)
    /// @param learner The address of the learner
    function mint(address learner) external;
}
