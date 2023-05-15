import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfig } from 'src/common/configs';

@Module({
  imports: [ConfigModule.forRoot(EnvConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
