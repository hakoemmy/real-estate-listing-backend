import { UserType } from '@prisma/client';
import { SignupDto, SignInDto, GenerateProductKeyDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignupDto, userType: UserType): Promise<{
        token: string;
    }>;
    signin(body: SignInDto): Promise<{
        token: string;
    }>;
    generateProductKey({ userType, email }: GenerateProductKeyDto): Promise<{
        productKey: string;
    }>;
}
