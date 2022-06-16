import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '@prisma/client';
interface SignupParams {
    name: string;
    email: string;
    password: string;
    phone: string;
}
interface SignInParams {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    signup({ name, email, password, phone }: SignupParams, userType: UserType): Promise<{
        token: string;
    }>;
    signin({ email, password }: SignInParams): Promise<{
        token: string;
    }>;
    private generateJWT;
    generateProductKey(email: string, userType: UserType): Promise<{
        productKey: string;
    }>;
}
export {};
