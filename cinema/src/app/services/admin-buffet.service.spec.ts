import { TestBed } from '@angular/core/testing';

import { AdminBuffetService } from './admin-buffet.service';

describe('AdminBuffetService', () => {
  let service: AdminBuffetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBuffetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
