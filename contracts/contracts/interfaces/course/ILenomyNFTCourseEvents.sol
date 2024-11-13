// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title The interface for the Lenomy Course Events
interface ILenomyNFTCourseEvents {
    /// @notice Event emitted when a course is bought
    event CourseBought(address indexed buyer, uint256 indexed courseId);

    /// @notice Event emitted when a course is accessed
    event CourseAccessed(address indexed learner, uint256 indexed courseId);
}
