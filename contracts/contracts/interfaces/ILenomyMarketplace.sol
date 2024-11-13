/// @notice SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./marketplace/ILenomyMarketplaceActions.sol";
import "./marketplace/ILenomyMarketplaceEvents.sol";
import "./marketplace/ILenomyMarketplaceState.sol";

interface ILenomyMarketplace is
    ILenomyMarketplaceActions,
    ILenomyMarketplaceEvents,
    ILenomyMarketplaceState
{}
