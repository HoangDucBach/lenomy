import { ethers } from "ethers";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "AlreadyListed",
    type: "error",
  },
  {
    inputs: [],
    name: "NoProceeds",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApprovedForMarketplace",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NotListed",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "PriceMustBeAboveZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PriceNotMet",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftCourseAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ItemBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftCourseAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ItemCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftCourseAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ItemsListed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftCourseAddress",
        type: "address",
      },
    ],
    name: "getListingPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "proceeds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "rentItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "returnItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftCourseAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "updateListingPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const getAll = async () => {
  const provider = new ethers.JsonRpcProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  return {
    contract,
    provider,
    signer,
  };
};

const buyItem = async (
  nftCourseAddress: string,
  tokenId: number,
  price: string,
) => {
  const { contract } = await getAll();
  const tx = await contract.buyItem(nftCourseAddress, tokenId, {
    value: ethers.parseEther(price),
  });

  await tx.wait();
  console.log("Item bought successfully");
};

const cancelListing = async (nftCourseAddress: string, tokenId: number) => {
  const { contract } = await getAll();
  const tx = await contract.cancelListing(nftCourseAddress, tokenId);

  await tx.wait();
  console.log("Listing cancelled successfully");
};

const getListingPrice = async (nftCourseAddress: string) => {
  const { contract } = await getAll();
  const price = await contract.getListingPrice(nftCourseAddress);

  return price;
};

const listItem = async (
  nftCourseAddress: string,
  tokenId: number,
  price: string,
) => {
  const { contract } = await getAll();
  const tx = await contract.listItem(
    nftCourseAddress,
    tokenId,
    ethers.parseEther(price),
  );

  await tx.wait();
  console.log("Item listed successfully");
};

const rentItem = async (nftCourseAddress: string, tokenId: number) => {
  const { contract } = await getAll();
  const tx = await contract.rentItem(nftCourseAddress, tokenId);

  await tx.wait();
  console.log("Item rented successfully");
};

const returnItem = async (nftCourseAddress: string, tokenId: number) => {
  const { contract } = await getAll();
  const tx = await contract.returnItem(nftCourseAddress, tokenId);

  await tx.wait();
  console.log("Item returned successfully");
};

const updateListingPrice = async (
  nftCourseAddress: string,
  tokenId: number,
  price: string,
) => {
  const { contract } = await getAll();
  const tx = await contract.updateListingPrice(
    nftCourseAddress,
    tokenId,
    ethers.parseEther(price),
  );

  await tx.wait();
  console.log("Listing price updated successfully");
};

const withdraw = async () => {
  const { contract } = await getAll();
  const tx = await contract.withdraw();

  await tx.wait();
  console.log("Withdraw successful");
};
