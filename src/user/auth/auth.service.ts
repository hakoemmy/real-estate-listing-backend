import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface SignupParams{
    name: string;
    email: string;
    password: string;
    phone: string;
};

interface SignInParams{
    email: string;
    password: string;
};

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}

    async signup({name,email,password,phone}: SignupParams, userType: UserType){
        
        const userExists = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
       if(userExists){
           throw new ConflictException();
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = await this.prismaService.user.create({
           data: {
               name,
               email,
               password: hashedPassword,
               phone,
               user_type: userType
           }
       })
        const token = await this.generateJWT(user.name, user.id);
        return {token};
       
    }

    async signin({email, password}: SignInParams ){
 
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });

        if(!user){
          throw new HttpException("Invalid credentials", 400);
        }

        const hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        if(!isValidPassword){
            throw new HttpException("Invalid credentials", 400);
          }
        const token = await this.generateJWT(user.name, user.id);
        return {token};
    }

    private async generateJWT(name: string, id: number){
        return await jwt.sign({
            name, id
        },
        process.env.JSON_WEB_TOKEN_KEY,{
            expiresIn: 3600000
        }
        );
    }

   async generateProductKey(email: string, userType: UserType){ 
    
        const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
        const productKey = await bcrypt.hash(string, 10);

        return {productKey};
    }
}
