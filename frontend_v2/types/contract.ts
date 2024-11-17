export interface CourseData {
    name: string;
    symbol: string;
    creator: string;
    description: string;
    price: number;
    encryptedCID: string;
    rentalUnitPrice: number;
    rentalUnitTimestamp: number;
}

export interface LearnerPrivileges {
    canAccess: boolean;
    accessExpiry: number;
}

export interface StreamPaymentData {
    depositor: string;
    recipient: string;
    flowRate: number;
    startTime: number;
    balance: number;
    isActive: boolean;
}
