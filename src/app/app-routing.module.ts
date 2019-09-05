import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './addtask/addtask.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ViewTaskComponent } from './viewtask/viewtask.component';

const APP_ROUTES: Routes = [
  { path: 'AddTask', component: AddTaskComponent },
  { path: 'AddTask/:id/:projectId/:mode', component: AddTaskComponent },
  { path: 'User', component: AdduserComponent },
  { path: 'Project', component: AddprojectComponent },
  { path: 'ViewTask', component: ViewTaskComponent },
  { path: '', redirectTo: '/User', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
