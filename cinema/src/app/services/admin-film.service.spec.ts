import { TestBed } from '@angular/core/testing';

import { AdminFilmService } from './admin-film.service';

describe('AdminFilmService', () => {
  let service: AdminFilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
