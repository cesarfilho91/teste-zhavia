import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogSchema } from './log.schema';
import { LogsService } from './logs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}