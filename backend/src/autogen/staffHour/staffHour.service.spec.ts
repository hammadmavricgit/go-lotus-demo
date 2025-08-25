import { Test, TestingModule } from '@nestjs/testing';
import { staffHourService } from './staffHour.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { staffHour } from './staffHour.entity';

describe('staffHourService', () => {
  let service: staffHourService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({}),
      save: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockReturnValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        staffHourService,
        {
          provide: getRepositoryToken(staffHour),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<staffHourService>(staffHourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests as needed
});
