import { OnInit, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Taskservice } from '../Services/Task.Service';
import { Task } from '../Model/Task';
import { ProjectService } from '../services/project.service';
import { Projectview } from '../Model/ProjectView';
import { Router } from "@angular/router";

@Component({
    selector: 'app-viewtask',
    templateUrl: './viewtask.component.html',
    styleUrls: ['./viewtask.component.css'],
    providers: [DatePipe]
})
export class ViewTaskComponent implements OnInit {

    taskList: Task[];
    taskList1: Task[];
    sortbycolumn: string = "startDate";
    sortorder: boolean = true;
    ShowProjectModalPopup: boolean;
    projectList: Projectview[];
    projectId: number;
    message: string;
    searchname: string;
    public constructor(
        private _taskservice: Taskservice, private projectService: ProjectService, public router: Router

    ) { }

    ngOnInit() {
        this.getProjects();
        this.ShowProjectModalPopup = false;
    }

    public getProjects() {
        return this.projectService.GetAll().subscribe(projects => {
            this.projectList = projects;
        });
    }

    private getAllTasks() {
        return this._taskservice.GetTaskByProjectId(this.projectId).subscribe(response => {
            this.taskList = response;
        });
    }

    viewtaskForm = new FormGroup({
        projectId: new FormControl(''),
        projectTitle: new FormControl('')
    });

    OnProjectSearch() {
        
        this.ShowProjectModalPopup = true;
    }

    AssignSelectedproject(projectObj: Projectview) {
        this.ShowProjectModalPopup = false;
        this.viewtaskForm.controls['projectId'].setValue(projectObj.projectId);
        this.viewtaskForm.controls['projectTitle'].setValue(projectObj.projectName)
        this.projectId = projectObj.projectId;
        this.getAllTasks()
    }

    private editTask(taskId: number, projectId: number) {
        let tempTask: Task; 
        //this.router.navigate(['/task', taskId, projectId, 'U']);
        this._taskservice.Update(tempTask,taskId,).subscribe((data) => {
            this.message = "Task Updated Successfully. ";
        })
    }

    private endTask(taskId: number) {
        this._taskservice.EndTask(taskId).subscribe((data) => {
            this.message = "Task Completed Successfully ";
        })
        this.getAllTasks()
        this.viewtaskForm.reset();
    }

    SortTask(sortcolumnName: string) {
        this.sortbycolumn = sortcolumnName;
        this.sortorder = !this.sortorder;

    }
}



