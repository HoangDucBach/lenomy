// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interfaces/ILenomyNFTCourseFactory.sol";

/// @title The Lenomy Course Factory contract
contract LenomyNftCourseFactory is ILenomyNFTCourseFactory {
    mapping(address => NFTCourse.CourseData) public courses;

    /// @inheritdoc ILenomyNFTCourseFactory
    function createCourse(
        NFTCourse.CourseData memory _courseData
    ) external override returns (address) {
        NFTCourse course = new NFTCourse(
            _courseData.name,
            _courseData.symbol,
            _courseData.creator,
            _courseData.description,
            _courseData.price,
            _courseData.encryptedCID
        );

        courses[address(course)] = _courseData;

        emit NFTCourseCreated(address(course), _courseData.creator);

        return address(course);
    }

    /// @inheritdoc ILenomyNFTCourseFactory
    function removeCourse(address _courseAddress) external override {
        delete courses[_courseAddress];
    }

    function updateCourse(
        address _courseAddress,
        NFTCourse.CourseData memory _courseData
    ) external override {
        courses[_courseAddress] = _courseData;
    }

    function getCourse(
        address _courseAddress
    ) external view override returns (NFTCourse.CourseData memory) {
        return courses[_courseAddress];
    }
}
