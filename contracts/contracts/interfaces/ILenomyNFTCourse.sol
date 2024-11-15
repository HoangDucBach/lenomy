// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./course/ILenomyNFTCourseActions.sol";
import "./course/ILenomyNFTCourseEvents.sol";
import "./course/ILenomyNFTCourseState.sol";

/// @title The interface for the NFT Course contract
interface ILenomyNFTCourse is
    ILenomyNFTCourseActions,
    ILenomyNFTCourseEvents,
    ILenomyNFTCourseState
{
 
}
