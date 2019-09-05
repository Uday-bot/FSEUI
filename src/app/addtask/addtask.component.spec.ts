import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './addtask.component';
import { DialogComponent } from '../SharedComponent/Dialog.component';
import { FormsModule,ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('AddtaskComponent', () => {
    let component: AddTaskComponent;
    let fixture: ComponentFixture<AddTaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports :[FormsModule,ReactiveFormsModule,HttpModule,HttpClientModule,RouterTestingModule],
            declarations: [AddTaskComponent,DialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});