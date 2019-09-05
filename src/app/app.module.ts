import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AdduserComponent } from './adduser/adduser.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { AddprojectComponent } from './addproject/addproject.component';
import { AddTaskComponent } from './addtask/addtask.component';
import { DialogComponent } from './SharedComponent/Dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewTaskComponent } from './viewtask/viewtask.component';
import { SearchPipe } from './SharedComponent/tableFilter';

@NgModule({
  declarations: [
    AppComponent,
    AddprojectComponent,
    AdduserComponent,
    DialogComponent,
    AddTaskComponent,
    ViewTaskComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule, ReactiveFormsModule, OrderModule, NgbModule.forRoot(), Ng2SearchPipeModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
