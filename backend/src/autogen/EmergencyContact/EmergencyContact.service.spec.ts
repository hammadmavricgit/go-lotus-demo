import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyContactService } from './EmergencyContact.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmergencyContact } from './EmergencyContact.entity';

describe('EmergencyContactService', () => {
  let service: EmergencyContactService;
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
        EmergencyContactService,
        {
          provide: getRepositoryToken(EmergencyContact),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EmergencyContactService>(EmergencyContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests as needed
});
