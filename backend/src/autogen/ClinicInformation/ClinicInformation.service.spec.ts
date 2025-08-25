import { Test, TestingModule } from '@nestjs/testing';
import { ClinicInformationService } from './ClinicInformation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClinicInformation } from './ClinicInformation.entity';

describe('ClinicInformationService', () => {
  let service: ClinicInformationService;
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
        ClinicInformationService,
        {
          provide: getRepositoryToken(ClinicInformation),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClinicInformationService>(ClinicInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests as needed
});
