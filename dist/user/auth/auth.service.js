"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
;
;
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async signup({ name, email, password, phone }, userType) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
        if (userExists) {
            throw new common_1.ConflictException();
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
        });
        const token = await this.generateJWT(user.name, user.id);
        return { token };
    }
    async signin({ email, password }) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw new common_1.HttpException("Invalid credentials", 400);
        }
        const hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword) {
            throw new common_1.HttpException("Invalid credentials", 400);
        }
        const token = await this.generateJWT(user.name, user.id);
        return { token };
    }
    async generateJWT(name, id) {
        return await jwt.sign({
            name, id
        }, process.env.JSON_WEB_TOKEN_KEY, {
            expiresIn: 3600000
        });
    }
    async generateProductKey(email, userType) {
        const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
        const productKey = await bcrypt.hash(string, 10);
        return { productKey };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map