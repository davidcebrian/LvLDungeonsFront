import { TestBed } from '@angular/core/testing';

import { PartidaServiceService } from './partida-service.service';

describe('PartidaServiceService', () => {
  let service: PartidaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
