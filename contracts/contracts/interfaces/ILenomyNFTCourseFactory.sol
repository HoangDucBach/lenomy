// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../LenomyNFTCourse.sol";

/// @title The interface for the Course Factory contract
interface ILenomyNFTCourseFactory {
    /// @notice Emmited when a new course is created
    event NFTCourseCreated(
        address indexed courseAddress,
        address indexed creator
    );

    /// @notice Emmited when a course is removed
    event NFTCourseRemoved(
        address indexed courseAddress,
        address indexed remover
    );

    /// @notice Emmited when a course is updated
    event NFTCourseUpdated(
        address indexed courseAddress,
        address indexed updater
    );

    /// @notice Creates a new course
    /// @param _courseData The course data
    function createCourse(
        LenomyNFTCourse.CourseData memory _courseData
    ) external returns (address);

    /// @notice Removes a course
    /// @param _courseAddress The course address
    function removeCourse(address _courseAddress) external;

    /// @notice Updates a course
    /// @param _courseAddress The course address
    /// @param _courseData The course data
    function updateCourse(
        address _courseAddress,
        LenomyNFTCourse.CourseData memory _courseData
    ) external;

    /// @notice Gets the course data
    /// @param _courseAddress The course address
    function getCourse(
        address _courseAddress
    ) external view returns (LenomyNFTCourse.CourseData memory);
}
