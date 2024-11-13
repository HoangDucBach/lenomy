import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("LenomyNFTCourseFactory", function () {
    async function deployCourseFactoryFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const LenomyNFTCourseFactory = await hre.ethers.getContractFactory("LenomyNftCourseFactory");
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
            encryptedCID: "QmTest"
        };
    }

    describe("Deployment", function () {
        it("Should deploy the contract", async function () {
            const { factory } = await loadFixture(deployCourseFactoryFixture);
            expect(factory.getAddress()).to.be.properAddress;
        });
    });

    describe("Course Management", function () {
        it("Should create a course", async function () {
            const { factory, owner } = await loadFixture(deployCourseFactoryFixture);

            const courseData = getCourseData(owner);

            const tx = await factory.createCourse(courseData);
            const receipt = await tx.wait();

            expect(tx).to.emit(factory, "NFTCourseCreated");
        });

        it("Should update a course", async function () {
            const { factory, owner } = await loadFixture(deployCourseFactoryFixture);

            const courseData = getCourseData(owner);

            const tx = await factory.createCourse(courseData);
            const receipt = await tx.wait();
            const courseAddress = receipt.events?.find(event => event.event === "NFTCourseCreated")?.args?.courseAddress;

            const updatedCourseData = {
                ...courseData,
                description: "An updated test course"
            };

            await factory.updateCourse(courseAddress, updatedCourseData);

            const storedCourseData = await factory.getCourse(courseAddress);
            expect(storedCourseData.description).to.equal("An updated test course");
        });

        it("Should remove a course", async function () {
            const { factory, owner } = await loadFixture(deployCourseFactoryFixture);

            const courseData = getCourseData(owner);

            const tx = await factory.createCourse(courseData);
            const receipt = await tx.wait();
            const courseAddress = receipt.events?.find(event => event.event === "NFTCourseCreated")?.args?.courseAddress;

            await factory.removeCourse(courseAddress);

            const storedCourseData = await factory.getCourse(courseAddress);
            expect(storedCourseData.name).to.equal("");
        });
    });
});