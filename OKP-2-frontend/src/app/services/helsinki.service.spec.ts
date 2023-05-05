import { TestBed } from '@angular/core/testing';

import { HelsinkiService } from './helsinki.service';

describe('HelsinkiService', () => {
  let service: HelsinkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelsinkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
