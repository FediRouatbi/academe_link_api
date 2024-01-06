import { Test, TestingModule } from '@nestjs/testing';

import { SharedRoleService } from './shared-role.service';

describe('SharedRoleService', () => {
  let service: SharedRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedRoleService],
    }).compile();

    service = module.get<SharedRoleService>(SharedRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
