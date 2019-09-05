import { TestBed, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { Http, Response, HttpModule } from '@angular/http';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService],
      imports:[HttpModule]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});