import { TestBed } from '@angular/core/testing';

import { AutJwtService } from './aut-jwt.service';

describe('AutJwtService', () => {
  let service: AutJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
