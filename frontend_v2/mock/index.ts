import {
  CourseData,
  LearnerPrivileges,
  StreamPaymentData,
} from "@/types/contract";

// Mock data
export const mockCourseData: CourseData = {
  name: "Taiko Course -What is Taiko?",
  symbol: "TAIKO",
  creator: "John Doe",
  description:
    "Meta Description: What is Taiko? Dive into the world of this open-source ZK-Rollup, designed to solve Ethereum's scalability problems while upholding its foundational principles.",
  price: 100,
  encryptedCID: "QmTzQ1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1",
  rentalUnitPrice: 10,
  rentalUnitTimestamp: 1609459200,
};

export const mockLearnerPrivileges: LearnerPrivileges = {
  canAccess: true,
  accessExpiry: 1672531199,
};

export const mockStreamPaymentData: StreamPaymentData = {
  depositor: "0x1234567890abcdef",
  recipient: "0xfedcba0987654321",
  flowRate: 1000,
  startTime: 1609459200,
  balance: 5000,
  isActive: true,
};
