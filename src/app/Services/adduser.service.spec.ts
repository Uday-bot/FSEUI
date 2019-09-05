import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './adduser.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';

describe('AdduserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports:[HttpModule,HttpClientModule]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});