// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./interfaces/ILenomyMarketplace.sol";
import "./NFTCourse.sol";

contract LenomyMarketplace is ILenomyMarketplace, ReentrancyGuard {
    struct Listing {
        address nftCourseAddress;
        uint256 price;
    }

    constructor() ReentrancyGuard() {}

    function listItem(
        address _nftCourseAddress,
        uint256 _price
    ) external override {}

    function cancelListing(address _nftCourseAddress) external override {}

    function buyItem(address _nftCourseAddress) external payable override {}

    function updateListingPrice(
        address _nftCourseAddress,
        uint256 _price
    ) external override {}

    function getListingPrice(
        address _nftCourseAddress
    ) external view override returns (uint256) {}

    function withdraw() external override {}
}
