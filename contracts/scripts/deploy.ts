import { ethers } from "hardhat";

async function main() {
    try {
        const LenomyMarketplaceContract = await ethers.getContractFactory("LenomyMarketplace");
        const lenomyMarketplaceContract = await LenomyMarketplaceContract.deploy();

        await lenomyMarketplaceContract.waitForDeployment();
        const tx = lenomyMarketplaceContract.deploymentTransaction();

        console.log("Contract deployed successfully.");
        // console.log(`Deployer: ${await lenomyMarketplaceContract.runner.address}`);
        console.log(`Deployed to: ${lenomyMarketplaceContract.target}`);
        console.log(`Transaction hash: ${tx?.hash}`);

        // Verify network state
        await ethers.provider.getBlock('latest');

    } catch (error) {
        console.error("Deployment failed:", error);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });