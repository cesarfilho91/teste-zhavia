import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { LogsService } from '../logs/logs.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LogsModule } from '../logs/logs.module';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly logsService: LogsService,
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

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);

    await this.logsService.create({
      action: 'UPDATE',
      details: `Tarefa atualizada com ID ${id}`,
    });

    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const result = await this.taskRepository.delete(id);

    await this.logsService.create({
      action: 'DELETE',
      details: `Tarefa excluída com ID ${id}`,
    });

    return result;
  }
}