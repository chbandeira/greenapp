import { TestBed } from '@angular/core/testing';

import { SurvivorService } from './survivor.service';

describe('SurvivorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurvivorService = TestBed.get(SurvivorService);
    expect(service).toBeTruthy();
  });
});
