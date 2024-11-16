
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { StreamingPayment } from "../typechain-types/contracts/StreamingPaymentFactory";

describe("StreamingPaymentFactory", function () {
    async function deployStreamingPaymentFactoryFixture() {
        const [owner, recipient] = await hre.ethers.getSigners();

        const StreamingPaymentFactory = await hre.ethers.getContractFactory("StreamingPaymentFactory");
        const factory = await StreamingPaymentFactory.deploy();

        return { factory, owner, recipient };
    }

    async function getStreamPaymentData(owner: { address: string }, recipient: { address: string }) {
        const { factory } = await loadFixture(deployStreamingPaymentFactoryFixture);

        const tx = await factory.createStreamingPayment(
            owner.address,
            recipient.address,
            hre.ethers.parseUnits("1", "wei"),
            { value: hre.ethers.parseUnits("30", "wei") }
        );

        await tx.wait();

        const filter = factory.filters.StreamingPaymentCreated;
        const events = await factory.queryFilter(filter);
        const streamingPaymentAddress = events[0].args._streamingPaymentAddress;

        const streamingPayment = await hre.ethers.getContractAt(
            "StreamingPayment",
            streamingPaymentAddress
        );

        return streamingPayment;
    }

    describe("Deployment", function () {
        it("Should deploy the contract", async function () {
            const { factory } = await loadFixture(deployStreamingPaymentFactoryFixture);
            const address = await factory.getAddress();
            expect(address).to.be.properAddress;
        });
    });

    describe("Streaming Payment Management", function () {
        it("Should create a streaming payment", async function () {
            const { factory, owner, recipient } = await loadFixture(deployStreamingPaymentFactoryFixture);
            const amount = hre.ethers.parseUnits("30", "wei");
            const flowRate = hre.ethers.parseUnits("1", "wei");

            const tx = await factory.createStreamingPayment(
                owner.address,
                recipient.address,
                flowRate,
                { value: amount }
            );

            await tx.wait();

            const filter = factory.filters.StreamingPaymentCreated;
            const events = await factory.queryFilter(filter);
            const streamingPaymentAddress = events[0].args._streamingPaymentAddress;

            expect(streamingPaymentAddress).to.be.properAddress;

            const streamingPayment = await hre.ethers.getContractAt(
                "StreamingPayment",
                streamingPaymentAddress
            );

            const streamPaymentData = await factory.getStreamingPayment(streamingPaymentAddress);

            // Verify contract balance
            const contractBalance = await hre.ethers.provider.getBalance(streamingPaymentAddress);
            expect(contractBalance).to.equal(amount);

            expect(streamPaymentData.depositor).to.equal(owner.address);
            expect(streamPaymentData.recipient).to.equal(recipient.address);
            expect(streamPaymentData.flowRate).to.equal(flowRate);
            expect(streamPaymentData.balance).to.equal(amount);
            expect(streamPaymentData.isActive).to.be.true;
        });
    });
    describe("Streaming Automation", function () {
        it("Should automate a streaming payment", async function () {
            const { factory, owner, recipient } = await loadFixture(deployStreamingPaymentFactoryFixture);

            const tx = await factory.createStreamingPayment(
                owner.address,
                recipient.address,
                hre.ethers.parseUnits("1", "wei"),
                { value: hre.ethers.parseUnits("30", "wei") }
            );

            const filter = factory.filters.StreamingPaymentCreated;
            const events = await factory.queryFilter(filter);
            const streamingPaymentAddress = events[0].args._streamingPaymentAddress;

            expect(streamingPaymentAddress).to.be.properAddress;

            const streamingPayment = await hre.ethers.getContractAt(
                "StreamingPayment",
                streamingPaymentAddress
            );

            const streamPaymentData = {
                depositor: await streamingPayment.depositor(),
                recipient: await streamingPayment.recipient(),
                flowRate: await streamingPayment.flowRate(),
                startTime: await streamingPayment.startTime(),
                balance: await streamingPayment.balance(),
                isActive: await streamingPayment.isActive(),
            } satisfies StreamingPayment.StreamPaymentDataStruct;


            const initialRecipientBalance = await hre.ethers.provider.getBalance(recipient.address);
            const INTERVAL = 15;

            await hre.network.provider.send("evm_increaseTime", [INTERVAL]);
            await hre.network.provider.send("evm_mine");

            await factory.process();

            // vitual more time
            await hre.network.provider.send("evm_increaseTime", [INTERVAL]);
            await hre.network.provider.send("evm_mine");

            await factory.process();

            const expectedPayment = BigInt(INTERVAL) * BigInt(streamPaymentData.flowRate) / BigInt(60);

            const finalRecipientBalance = await hre.ethers.provider.getBalance(recipient.address);
            console.log("finalRecipientBalance", finalRecipientBalance.toString());
            console.log("initialRecipientBalance", initialRecipientBalance.toString());
            expect(finalRecipientBalance - initialRecipientBalance).to.equal(expectedPayment);
        });
    });
});