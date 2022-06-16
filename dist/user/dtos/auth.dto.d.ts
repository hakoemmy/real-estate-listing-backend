import { UserType } from '@prisma/client';
export declare class SignupDto {
    name: string;
    phone: string;
    email: string;
    password: string;
    productKey?: string;
}
export declare class SignInDto {
    email: string;
    password: string;
}
export declare class GenerateProductKeyDto {
    email: string;
    userType: UserType;
}
