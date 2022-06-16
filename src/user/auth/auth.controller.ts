import { Controller, Post, Body, Param, ParseEnumPipe, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@prisma/client';
import { SignupDto, SignInDto, GenerateProductKeyDto } from '../dtos/auth.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService){}

    @Post('/signup/:userType')
   async signup(@Body() body: SignupDto, @Param('userType', new ParseEnumPipe(UserType)) userType: UserType){
        
        if(userType !== UserType.BUYER){
            if(!body.productKey){
                throw new UnauthorizedException();
            }

            const validProductkey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
            const isValidProductKey = await bcrypt.compare(validProductkey, body.productKey);

            if(!isValidProductKey){
                throw new UnauthorizedException();
            }

        }
        return this.authService.signup(body, userType);
    }

    @Post('/signin')
    signin(@Body() body: SignInDto){
        return this.authService.signin(body);
    }

    @Post('/key')
    generateProductKey(@Body() {userType, email}: GenerateProductKeyDto){
        return this.authService.generateProductKey(email,userType);
    }
}
