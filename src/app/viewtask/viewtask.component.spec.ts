import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTaskComponent } from './viewtask.component';
import { FormsModule,ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { DialogComponent } from '../SharedComponent/Dialog.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewtaskComponent', () => {
    let component: ViewTaskComponent;
    let fixture: ComponentFixture<ViewTaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports :[HttpModule,FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule],
            declarations: [ViewTaskComponent,DialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});