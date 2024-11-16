import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { LenomyNFTCourse } from "../typechain-types/contracts/LenomyNFTCourseFactory";


describe("LenomyNFTCourseFactory", function () {
    async function deployCourseFactoryFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const LenomyNFTCourseFactory = await hre.ethers.getContractFactory("LenomyNFTCourseFactory");

        const factory = await LenomyNFTCourseFactory.deploy();
        return { factory, owner, otherAccount };
    }

    function getCourseData(owner: { address: string }) {
        return {
            name: "Test Course",
            symbol: "TST",
            creator: owner.address,
            description: "A test course",
            price: 1000,
            encryptedCID: "QmTest",
            rentalUnitPrice: 1,
            rentalUnitTimestamp: 60

        } satisfies LenomyNFTCourse.CourseDataStruct;
    }

    describe("Deployment", function () {
        it("Should deploy the contract", async function () {
            const { factory } = await loadFixture(deployCourseFactoryFixture);
            const address = await factory.getAddress();
            expect(address).to.be.properAddress;
        });
    });

    describe("Course Management", function () {
        it("Should create a course  ", async function () {
            const { factory, owner } = await loadFixture(deployCourseFactoryFixture);

            const courseData = getCourseData(owner);

            const tx = await factory.createCourse(courseData);
            await tx.wait();

            // factory.on(factory.filters.NFTCourseCreated, (courseAddress, creator) => {
            //     expect(courseAddress).to.be.properAddress;
            // })

            const fileter = factory.filters.NFTCourseCreated;
            const events = await factory.queryFilter(fileter);
            const courseAddress = events[0].args.courseAddress;

            const storedCourseData = await factory.getCourse(courseAddress);
            expect(storedCourseData.name).to.equal("Test Course");
        });

        it("Should update a course", async function () {
            const { factory, owner } = await loadFixture(deployCourseFactoryFixture);

            const courseData = getCourseData(owner);

            const tx = await factory.createCourse(courseData);
            await tx.wait();

            const fileter = factory.filters.NFTCourseCreated
            const events = await factory.queryFilter(fileter);
            const courseAddress = events[0].args.courseAddress;

            const updatedCourseData = {
                ...courseData,
                description: "An updated test course"
            };

            const txUpdate = await factory.updateCourse(courseAddress, updatedCourseData);
            await txUpdate.wait();

            const updatedFilter = factory.filters.NFTCourseUpdated;
            const updatedEvents = await factory.queryFilter(updatedFilter);

            const updatedCourseAddress = updatedEvents[0].args.courseAddress;
            const storedCourseData = await factory.getCourse(updatedCourseAddress);
            expect(storedCourseData.description).to.equal("An updated test course");
        });

        it("Should remove a course", async function () {
            const { factory, owner } = await loadFixture(deployCourseFactoryFixture);

            const courseData = getCourseData(owner);

            const tx = await factory.createCourse(courseData);
            await tx.wait();

            const fileter = factory.filters.NFTCourseCreated;
            const events = await factory.queryFilter(fileter);
            const courseAddress = events[0].args.courseAddress;

            const txRemove = await factory.removeCourse(courseAddress);
            await txRemove.wait();

            const removedFilter = factory.filters.NFTCourseRemoved;
            const removedEvents = await factory.queryFilter(removedFilter);

            const removedCourseAddress = removedEvents[0].args.courseAddress;
            const storedCourseData = await factory.getCourse(removedCourseAddress);
            expect(storedCourseData.name).to.equal("");
        });
        it("Should mint a course", async function () {
            const { factory, owner } = await loadFixture(deployCourseFactoryFixture);

            const courseData = getCourseData(owner);

            const tx = await factory.createCourse(courseData);
            await tx.wait();

            factory.on(factory.filters.NFTCourseCreated, async (courseAddress, creator) => {
                expect(courseAddress).to.be.properAddress;

                const nftCourse = await hre.ethers.getContractAt("LenomyNFTCourse", courseAddress);

                const tokenId = await nftCourse.nextTokenId();
                const price = 1000;

                expect(tokenId).to.equal(1);
                await nftCourse.mint(await owner.getAddress());

                const ownerBalance = await nftCourse.balanceOf(await owner.getAddress());
                expect(ownerBalance).to.equal(1);

                const ownerOfToken = await nftCourse.ownerOf(tokenId);
                expect(ownerOfToken).to.equal(await owner.getAddress());
            })
        });
    });

});