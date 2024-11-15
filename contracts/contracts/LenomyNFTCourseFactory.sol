// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interfaces/ILenomyNFTCourseFactory.sol";

error NotOwner();
error NotCreator();

/// @title The Lenomy Course Factory contract
contract LenomyNFTCourseFactory is ILenomyNFTCourseFactory {
    mapping(address => LenomyNFTCourse.CourseData) public courses;

    /// @inheritdoc ILenomyNFTCourseFactory
    function createCourse(
        LenomyNFTCourse.CourseData memory _courseData
    ) external override returns (address) {
        LenomyNFTCourse course = new LenomyNFTCourse(
            _courseData.name,
            _courseData.symbol,
            _courseData.creator,
            _courseData.description,
            _courseData.price,
            _courseData.encryptedCID,
            _courseData.rentalPricePerSecond,
            _courseData.rentalPeriod
        );

        courses[address(course)] = _courseData;

        emit NFTCourseCreated(address(course), _courseData.creator);

        return address(course);
    }

    /// @inheritdoc ILenomyNFTCourseFactory
    function removeCourse(
        address _courseAddress
    ) external override isCreator(_courseAddress) {
        delete courses[_courseAddress];

        emit NFTCourseRemoved(_courseAddress, msg.sender);
    }

    function updateCourse(
        address _courseAddress,
        LenomyNFTCourse.CourseData memory _courseData
    ) external override isCreator(_courseAddress) {
        courses[_courseAddress] = _courseData;

        emit NFTCourseUpdated(_courseAddress, _courseData.creator);
    }

    function getCourse(
        address _courseAddress
    ) external view override returns (LenomyNFTCourse.CourseData memory) {
        return courses[_courseAddress];
    }

    /// @notice Check creator role
    /// @param _nftCourseAddress The address of the NFT course
    modifier isCreator(address _nftCourseAddress) {
        require(
            courses[_nftCourseAddress].creator == msg.sender,
            "Not the creator"
        );
        _;
    }

    /// @notice Check owner role
    /// @param _nftCourseAddress The address of the NFT course
    modifier isOwner(address _nftCourseAddress) {
        require(
            courses[_nftCourseAddress].creator == msg.sender,
            "Not the owner"
        );
        _;
    }
}
