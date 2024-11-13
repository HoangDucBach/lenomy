// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./interfaces/ILenomyMarketplace.sol";
import "./NFTCourse.sol";

error PriceNotMet(address nftCourseAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftCourseAddress, uint256 tokenId);
error NotListed(address nftCourseAddress, uint256 tokenId);
error AlreadyListed(address nftCourseAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotCreator();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

contract LenomyMarketplace is ILenomyMarketplace, ReentrancyGuard {
    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) public proceeds;

    constructor() ReentrancyGuard() {}

    function listItem(
        address _nftCourseAddress,
        uint256 _tokenId,
        uint256 _price
    )
        external
        override
        notListed(_nftCourseAddress, _tokenId)
        isOwner(_nftCourseAddress, _tokenId, msg.sender)
    {
        if (_price == 0) {
            revert PriceMustBeAboveZero();
        }

        listings[_nftCourseAddress][_tokenId] = Listing({
            price: _price,
            seller: msg.sender
        });

        emit ItemsListed(msg.sender, _nftCourseAddress, _tokenId, _price);
    }

    function cancelListing(
        address _nftCourseAddress,
        uint256 _tokenId
    ) external override isOwner(_nftCourseAddress, _tokenId, msg.sender) {
        Listing memory listing = listings[_nftCourseAddress][_tokenId];
        if (listing.seller == address(0)) {
            revert NotListed(_nftCourseAddress, _tokenId);
        }

        delete listings[_nftCourseAddress][_tokenId];

        emit ItemCancelled(msg.sender, _nftCourseAddress, _tokenId);
    }

    function buyItem(
        address _nftCourseAddress,
        uint256 _tokenId
    ) public payable override {
        Listing memory listing = listings[_nftCourseAddress][_tokenId];
        if (listing.seller == address(0)) {
            revert NotListed(_nftCourseAddress, _tokenId);
        }

        if (msg.value < listing.price) {
            revert PriceNotMet(_nftCourseAddress, _tokenId, listing.price);
        }

        NFTCourse nftCourse = NFTCourse(_nftCourseAddress);
        nftCourse.safeTransferFrom(msg.sender, listing.seller, _tokenId);

        proceeds[_nftCourseAddress] += msg.value;
        delete listings[_nftCourseAddress][_tokenId];

        emit ItemBought(msg.sender, _nftCourseAddress, _tokenId, msg.value);
    }

    function updateListingPrice(
        address _nftCourseAddress,
        uint256 _tokenId,
        uint256 _price
    ) external override isOwner(_nftCourseAddress, _tokenId, msg.sender) {
        Listing storage listing = listings[_nftCourseAddress][_tokenId];
        if (listing.seller == address(0)) {
            revert NotListed(_nftCourseAddress, _tokenId);
        }

        listing.price = _price;
    }

    function getListingPrice(
        address _nftCourseAddress
    ) external view override returns (uint256) {}

    function withdraw() external override {
        uint256 proceedsAmount = proceeds[msg.sender];
        if (proceedsAmount == 0) {
            revert NoProceeds();
        }

        payable(msg.sender).transfer(proceedsAmount);
        proceeds[msg.sender] = 0;
    }

    /// @notice Check owner
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _tokenID The token ID of the item
    /// @param _caller The caller
    modifier isOwner(
        address _nftCourseAddress,
        uint256 _tokenID,
        address _caller
    ) {
        NFTCourse nftCourse = NFTCourse(_nftCourseAddress);
        address owner = nftCourse.ownerOf(_tokenID);

        if (owner != _caller) {
            revert NotOwner();
        }
        _;
    }

    /// @notice Check creator
    /// @param _nftCourseAddress The address of the NFT course
    modifier isCreator(address _nftCourseAddress) {
        NFTCourse nftCourse = NFTCourse(_nftCourseAddress);
        if (nftCourse.creator() != msg.sender) {
            revert NotCreator();
        }
        _;
    }

    /// @notice Check not listed
    /// @param _nftCourseAddress The address of the NFT course
    /// @param _tokenId The token ID of the item
    modifier notListed(address _nftCourseAddress, uint256 _tokenId) {
        Listing memory listing = listings[_nftCourseAddress][_tokenId];
        require(
            listing.seller == address(0),
            "LenomyMarketplace: item is already listed"
        );

        if (listing.price > 0) {
            revert AlreadyListed(_nftCourseAddress, _tokenId);
        }
        _;
    }
}
