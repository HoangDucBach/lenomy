import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("LenomyMarketplace", function () {
    async function deployMarketplaceFixture() {
        const [owner, learner, otherAccount] = await hre.ethers.getSigners();

        const LenomyMarketplace = await hre.ethers.getContractFactory("LenomyMarketplace");
        const marketplace = await LenomyMarketplace.deploy();

        const LenomyNFTCourseFactory = await hre.ethers.getContractFactory("LenomyNFTCourseFactory");
        const factory = await LenomyNFTCourseFactory.deploy();

        return { marketplace, factory, owner, otherAccount, learner };
    }
    async function createNFTCourseAddress() {
        const { factory, owner } = await loadFixture(deployMarketplaceFixture);

        const courseData = {
            name: "Test Course",
            symbol: "TST",
            creator: owner.address,
            description: "A test course",
            price: 1000,
            encryptedCID: "QmTest"
        };

        const tx = await factory.createCourse(courseData);
        await tx.wait();

        const nftCourseCreatedFilter = factory.filters.NFTCourseCreated;
        const events = await factory.queryFilter(nftCourseCreatedFilter);

        const nftCourseAddress = events[0].args.courseAddress;

        return nftCourseAddress;
    }
    describe("Deployment", function () {
        it("Should deploy the contract", async function () {
            const { marketplace } = await loadFixture(deployMarketplaceFixture);
            const address = await marketplace.getAddress();
            expect(address).to.be.properAddress;
        });
    });

    describe("Listing Management", function () {
        it("Should list an item", async function () {
            const { marketplace, factory, owner, learner } = await loadFixture(deployMarketplaceFixture);

            const nftCourse = await hre.ethers.getContractAt("LenomyNFTCourse", await createNFTCourseAddress());


            const tokenId = await nftCourse.nextTokenId();
            const price = 1000;

            expect(tokenId).to.equal(1);
            await nftCourse.mint(await owner.getAddress());
            await nftCourse.connect(owner).approve(marketplace.getAddress(), tokenId);
            await marketplace.connect(owner).listItem(await nftCourse.getAddress(), tokenId, price);

            const listing = await marketplace.listings(await nftCourse.getAddress(), tokenId);
            expect(await nftCourse.getApproved(tokenId)).to.equal(await marketplace.getAddress());
            expect(listing.price).to.equal(price);
            expect(listing.seller).to.equal(owner.address);
        });

        it("Should cancel a listing", async function () {
            const { marketplace, factory, owner } = await loadFixture(deployMarketplaceFixture);

            const nftCourse = await hre.ethers.getContractAt("LenomyNFTCourse", await createNFTCourseAddress());

            const tokenId = await nftCourse.nextTokenId();
            const price = 1000;

            await nftCourse.mint(owner.address);
            await nftCourse.connect(owner).approve(marketplace.getAddress(), tokenId);
            await marketplace.listItem(await nftCourse.getAddress(), tokenId, price);
            await marketplace.cancelListing(await nftCourse.getAddress(), tokenId);

            const listing = await marketplace.listings(await nftCourse.getAddress(), tokenId);
            expect(listing.seller).to.equal(hre.ethers.ZeroAddress);
        });

        it("Should buy an item", async function () {
            const { marketplace, factory, owner, otherAccount } = await loadFixture(deployMarketplaceFixture);

            const nftCourse = await hre.ethers.getContractAt("LenomyNFTCourse", await createNFTCourseAddress());

            const tokenId = await nftCourse.nextTokenId();
            const price = 1000;

            await nftCourse.mint(owner.address);
            await nftCourse.connect(owner).approve(marketplace.getAddress(), tokenId);
            await marketplace.listItem(await nftCourse.getAddress(), tokenId, price);
            await marketplace.connect(otherAccount).buyItem(await nftCourse.getAddress(), tokenId, { value: price });

            const listing = await marketplace.listings(await nftCourse.getAddress(), tokenId);
            expect(listing.seller).to.equal(hre.ethers.ZeroAddress);
        });

        it("Should update listing price", async function () {
            const { marketplace, factory, owner } = await loadFixture(deployMarketplaceFixture);

            const nftCourse = await hre.ethers.getContractAt("LenomyNFTCourse", await createNFTCourseAddress());

            const tokenId = await nftCourse.nextTokenId();
            const price = 1000;

            await nftCourse.mint(owner.address);
            await nftCourse.connect(owner).approve(marketplace.getAddress(), tokenId);
            await marketplace.listItem(await nftCourse.getAddress(), tokenId, price);
            await marketplace.updateListingPrice(await nftCourse.getAddress(), tokenId, 2000);

            const listing = await marketplace.listings(await nftCourse.getAddress(), tokenId);
            expect(listing.price).to.equal(2000);
        });
        
        it("Should withdraw funds", async function () {
            const { marketplace, factory, owner, otherAccount } = await loadFixture(deployMarketplaceFixture);

            const nftCourse = await hre.ethers.getContractAt("LenomyNFTCourse", await createNFTCourseAddress());

            const tokenId = await nftCourse.nextTokenId();
            const price = 1000;

            await nftCourse.mint(owner.address);
            await nftCourse.connect(owner).approve(marketplace.getAddress(), tokenId);

            await marketplace.connect(owner).listItem(await nftCourse.getAddress(), tokenId, price);
            await marketplace.connect(otherAccount).buyItem(await nftCourse.getAddress(), tokenId, { value: price });

            await marketplace.connect(owner).withdraw();

            const balance = await hre.ethers.provider.getBalance(await owner.getAddress());
            expect(balance).to.be.above(0);
        });
    });
});
