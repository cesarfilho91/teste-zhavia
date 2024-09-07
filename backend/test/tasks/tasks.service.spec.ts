import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../src/tasks/tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../src/tasks/entities/task.entity';
import { LogsService } from '../../src/logs/logs.service';
import { UpdateTaskDto } from '../../src/tasks/dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: any;
  let logsService: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: LogsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get(getRepositoryToken(Task));
    logsService = module.get(LogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new task', async () => {
      const task = { title: 'New Task' };
      taskRepository.create.mockReturnValue(task);
      taskRepository.save.mockResolvedValue(task);
      //logsService.create.mockResolvedValue({});

      const result = await service.create(task);
      expect(result).toEqual(task);
      expect(taskRepository.create).toHaveBeenCalledWith({
        ...task,
        status: 'pendente',
      });
      expect(taskRepository.save).toHaveBeenCalledWith(task);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ title: 'Task 1' }, { title: 'Task 2' }] as Task[];
      taskRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll();
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const task = { id: 1, title: 'Task 1' } as Task;
      taskRepository.findOneBy.mockResolvedValue(task);

      const result = await service.findOne(1);
      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should update and return a task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const task = { id: 1, title: 'Updated Task' } as Task;
      taskRepository.update.mockResolvedValue({});
      taskRepository.findOneBy.mockResolvedValue(task);
      //logsService.create.mockResolvedValue({});

      const result = await service.update(1, updateTaskDto);
      expect(result).toEqual(task);
      expect(taskRepository.update).toHaveBeenCalledWith(1, updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should remove a task and return the result', async () => {
      const result = { affected: 1 };
      taskRepository.delete.mockResolvedValue(result);
      //logsService.create.mockResolvedValue({});

      const response = await service.remove(1);
      expect(response).toEqual(result);
    });
  });
});