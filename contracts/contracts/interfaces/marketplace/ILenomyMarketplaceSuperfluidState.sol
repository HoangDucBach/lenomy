// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../../superfluid/interfaces/superfluid/ISuperfluid.sol";
import "../../superfluid/interfaces/agreements/IConstantFlowAgreementV1.sol";

/// @title The interface for the Lenomy Marketplace Actions
interface ILenomyMarketplaceSuperfluid {
    ISuperfluid superfluid() external view returns (ISuperfluid);
    IConstantFlowAgreementV1 cfa() external view returns (IConstantFlowAgreementV1);
}