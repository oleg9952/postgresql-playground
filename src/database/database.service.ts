import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { EnvConfig } from 'src/config/env.config';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor(private readonly _configService: ConfigService<EnvConfig>) {
    super({
      adapter: new PrismaPg({
        connectionString: _configService.get('DATABASE_URL'),
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
