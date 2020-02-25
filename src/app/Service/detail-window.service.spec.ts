import { TestBed } from '@angular/core/testing';

import { DetailWindowService } from './detail-window.service';

describe('DetailWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailWindowService = TestBed.get(DetailWindowService);
    expect(service).toBeTruthy();
  });
});
