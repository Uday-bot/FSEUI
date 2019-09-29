import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserComponent } from './adduser.component';
import { FormsModule,ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';

import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';


describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>; 
  let var_httpClient:HttpClient;
  let var_httpclientController:HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        ReactiveFormsModule,
        HttpModule 
        

      ],
      declarations: [ AdduserComponent ]
    })
    .compileComponents();
    var_httpClient:TestBed.get(HttpClient);
    var_httpclientController=TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
