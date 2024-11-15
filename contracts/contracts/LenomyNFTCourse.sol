// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/ILenomyNFTCourse.sol";

contract LenomyNFTCourse is ERC721, ILenomyNFTCourse, AccessControl {
    /// @notice Course Data
    struct CourseData {
        string name;
        string symbol;
        address creator;
        string description;
        uint256 price;
        string encryptedCID;
        uint256 rentalPricePerSecond;
        uint256 rentalPeriod;
    }

    /// @notice The role for the nft course manager
    bytes32 public constant CREATOR_MANAGER_ROLE =
        keccak256("COURSE_MANAGER_ROLE");

    /// @notice The role for the nft course contract
    bytes32 public constant COURSE_MANAGER_ROLE =
        keccak256("COURSE_MANAGER_ROLE");

    /// @notice The next token id (known as the next learner)
    uint256 public override nextTokenId;

    /// @inheritdoc ILenomyNFTCourseState
    address public override creator;

    /// @inheritdoc ILenomyNFTCourseState
    string public override description;

    /// @inheritdoc ILenomyNFTCourseState
    uint256 public override price;

    /// @inheritdoc ILenomyNFTCourseState
    string public override encryptedCID;

    /// @inheritdoc ILenomyNFTCourseState
    uint256 public override rentalPricePerSecond;

    /// @inheritdoc ILenomyNFTCourseState
    uint256 public override rentalPeriod;

    /// @inheritdoc ILenomyNFTCourseState
    mapping(address => PrivilegesRole) public override learnerPrivileges;

    constructor(
        string memory _name,
        string memory _symbol,
        address _creator,
        string memory _description,
        uint256 _price,
        string memory _encryptedCID,
        uint256 _rentalPricePerSecond,
        uint256 _rentalPeriod
    ) ERC721(_name, _symbol) {
        _grantRole(CREATOR_MANAGER_ROLE, _creator);
        _grantRole(COURSE_MANAGER_ROLE, address(this));
        nextTokenId = 1;
        creator = _creator;
        description = _description;
        price = _price;
        encryptedCID = _encryptedCID;
        rentalPricePerSecond = _rentalPricePerSecond;
        rentalPeriod = _rentalPeriod;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// @inheritdoc ILenomyNFTCourseActions
    function accessCourse() external override {}

    /// @inheritdoc ILenomyNFTCourseActions
    function mint(
        address learner
    ) external override onlyRole(CREATOR_MANAGER_ROLE) {
        _safeMint(learner, nextTokenId);
        nextTokenId += 1;
    }
}
