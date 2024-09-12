import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { LogsModule } from '../logs/logs.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    LogsModule,
    NotificationModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}