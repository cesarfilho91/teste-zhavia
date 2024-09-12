import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { LogsService } from '../logs/logs.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotificationGateway } from '../notification/notification.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly logsService: LogsService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...task,
      status: task.status || 'pendente',
    });

    const savedTask = await this.taskRepository.save(newTask);

    await this.logsService.create({
      action: 'CREATE',
      details: `Tarefa criada com ID ${savedTask.id}`,
    });

    this.notificationGateway.server.emit('notification', {
      type: 'NEW_TASK',
      data: savedTask,
    });

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({id});
    if(!task){
      throw new NotFoundException('${id}');
    }

    if(updateTaskDto.status!==undefined && updateTaskDto.status.trim()===''){
      throw new BadRequestException('Status Vazio')
    }

    await this.taskRepository.update(id, updateTaskDto);

    const updatedTask = await this.findOne(id);

    await this.logsService.create({
      action: 'UPDATE',
      details: `Tarefa atualizada com ID ${id}`,
    });

    this.notificationGateway.server.emit('notification', {
      type: 'TASK_UPDATED',
      data: updatedTask,
    });

    return updatedTask;
  }

  async remove(id: number): Promise<any> {
    const taskToRemove = await this.findOne(id);
    const result = await this.taskRepository.delete(id);

    await this.logsService.create({
      action: 'DELETE',
      details: `Tarefa excluída com ID ${id}`,
    });

    this.notificationGateway.server.emit('notification', {
      type: 'TASK_DELETED',
      data: taskToRemove,
    });

    return result;
  }
}