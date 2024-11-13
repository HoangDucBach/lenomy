// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/ILenomyNFTCourse.sol";

contract NFTCourse is ERC721, ILenomyNFTCourse, AccessControl {
    /// @notice The role for the nft course manager
    bytes32 public constant CREATOR_MANAGER_ROLE =
        keccak256("COURSE_MANAGER_ROLE");

    /// @notice The role for the nft course contract
    bytes32 public constant COURSE_MANAGER_ROLE =
        keccak256("COURSE_MANAGER_ROLE");

    /// @notice The next token id (known as the next learner)
    uint256 private _nextTokenId;

    /// @inheritdoc ILenomyNFTCourseState
    address public override creator;

    /// @inheritdoc ILenomyNFTCourseState
    string public override description;

    /// @inheritdoc ILenomyNFTCourseState
    uint256 public override price;

    /// @inheritdoc ILenomyNFTCourseState
    string public override encryptedCID;

    constructor(
        string memory _name,
        string memory _symbol,
        address _creator,
        string memory _description,
        uint256 _price,
        string memory _encryptedCID
    ) ERC721(_name, _symbol) {
        _grantRole(CREATOR_MANAGER_ROLE, _creator);
        _grantRole(COURSE_MANAGER_ROLE, address(this));
        _nextTokenId = 1;
        creator = _creator;
        description = _description;
        price = _price;
        encryptedCID = _encryptedCID;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// @inheritdoc ILenomyNFTCourseActions
    function buyCourse() external payable override {
        require(msg.value == price, "NFTCourse: invalid price");

        payable(creator).transfer(msg.value);

        _safeMint(msg.sender, _nextTokenId);
        _nextTokenId += 1;
    }

    /// @inheritdoc ILenomyNFTCourseActions
    function accessCourse() external override {}

    /// @inheritdoc ILenomyNFTCourseActions
    function mint(address learner) external override onlyRole(CREATOR_MANAGER_ROLE) {
        _safeMint(learner, _nextTokenId);
        _nextTokenId += 1;
    }
}
