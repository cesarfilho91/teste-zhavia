import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../../src/tasks/tasks.controller';
import { TasksService } from '../../src/tasks/tasks.service';
import { UpdateTaskDto } from '../../src/tasks/dto/update-task.dto';
import { Task } from '../../src/tasks/entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            //create: jest.fn().mockResolvedValue({ id: '1', ...new CreateTaskDto() }),
            findAll: jest.fn().mockResolvedValue([new Task()]),
            findOne: jest.fn().mockResolvedValue(new Task()),
            update: jest.fn().mockResolvedValue(new Task()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  /*it('should create a task', async () => {
    const result = await controller.create(new CreateTaskDto());
    expect(result).toHaveProperty('id');
  });*/

  it('should find all tasks', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([new Task()]);
  });

});