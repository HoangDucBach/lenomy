import { CourseData, LearnerPrivileges, StreamPaymentData } from "@/types/contract";

// Mock data
export const mockCourseData: CourseData = {
    name: "Introduction to TypeScript",
    symbol: "TS101",
    creator: "John Doe",
    description: "A comprehensive course on TypeScript.",
    price: 100,
    encryptedCID: "QmTzQ1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1Y1",
    rentalUnitPrice: 10,
    rentalUnitTimestamp: 1609459200
};

export const mockLearnerPrivileges: LearnerPrivileges = {
    canAccess: true,
    accessExpiry: 1672531199
};

export const mockStreamPaymentData: StreamPaymentData = {
    depositor: "0x1234567890abcdef",
    recipient: "0xfedcba0987654321",
    flowRate: 1000,
    startTime: 1609459200,
    balance: 5000,
    isActive: true
};
