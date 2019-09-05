import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddprojectComponent } from './addproject.component';
import { DialogComponent } from '../SharedComponent/Dialog.component';
import { FormsModule,ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';


describe('AddprojectComponent', () => {
    let component: AddprojectComponent;
    let fixture: ComponentFixture<AddprojectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[FormsModule,ReactiveFormsModule,HttpModule,HttpClientModule],
            declarations: [AddprojectComponent,DialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddprojectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});