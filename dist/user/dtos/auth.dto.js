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
exports.GenerateProductKeyDto = exports.SignInDto = exports.SignupDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class SignupDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, { message: 'phone must be valid' }),
    __metadata("design:type", String)
], SignupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupDto.prototype, "productKey", void 0);
exports.SignupDto = SignupDto;
class SignInDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
exports.SignInDto = SignInDto;
class GenerateProductKeyDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], GenerateProductKeyDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.UserType),
    __metadata("design:type", String)
], GenerateProductKeyDto.prototype, "userType", void 0);
exports.GenerateProductKeyDto = GenerateProductKeyDto;
//# sourceMappingURL=auth.dto.js.map