import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
