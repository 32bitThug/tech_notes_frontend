import { TestBed } from '@angular/core/testing';

import { NotesListService } from './notes-list.service';

describe('NotesListService', () => {
  let service: NotesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
