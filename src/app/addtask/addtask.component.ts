import { OnInit, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/adduser.service';
import { User } from '../Model/User';
import { ProjectService } from '../services/project.service';
import { Projectview } from '../Model/ProjectView';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParentTask } from '../Model/ParentTask';
import { Taskservice } from '../Services/Task.Service';
import { Task } from '../Model/Task';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-addtask',
    templateUrl: './addtask.component.html',
    styleUrls: ['./addtask.component.css'],
    providers: [DatePipe]
})
export class AddTaskComponent implements OnInit {

    listUsers: User[];
    listProject: Projectview[];
    listParentTask: ParentTask[];
    showDialog: boolean;
    showParentTaskDialog: boolean;
    showUserTaskDialog: boolean;
    searchname: string;
    selectedProject: Projectview;
    selectedParent: ParentTask;
    datesValidated = false;
    message: string;
    isParentSelected: boolean;
    isFormvalid: boolean;
    taskIdUpdate: number;
    isUpdate: boolean = false;
    passingProjectId: number;
    taskInfo: Task;

    projectForm = new FormGroup({
        projectId: new FormControl(''),
        projectTitle: new FormControl('')
    })

    taskForm = new FormGroup({
        projectId: new FormControl(''),
        projectTitle: new FormControl(''),
        taskId: new FormControl(''),
        taskName: new FormControl(''),
        priorityValue: new FormControl('15'),
        parentTaskId: new FormControl(''),
        parentTaskName: new FormControl(''),
        userId: new FormControl(''),
        firstName: new FormControl(''),
        lastname: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        isParentChecked: new FormControl('')
    })
    public constructor(private _userService: UserService, private _taskService: Taskservice,
        private datePipe: DatePipe,
        private _projectService: ProjectService, private modalService: NgbModal, route: ActivatedRoute) {

        this.taskIdUpdate = route.snapshot.params['id'];
        this.passingProjectId = route.snapshot.params['projectId'];

        var mode = route.snapshot.params['mode'];
        if (mode == 'U') {
            this.isUpdate = true;
        }
        else {
            this.isUpdate = false;
        }
    }

    ngOnInit() {
        this._userService.GetAll().subscribe(x => {
            this.listUsers = x
        });

        if (this.passingProjectId > 0) {
            this._taskService.GetTaskByTaskId(this.taskIdUpdate).subscribe(x => {
                this.taskInfo = x;
                this._projectService.GetByProjectId(this.passingProjectId).subscribe(x => {
                    this.selectedProject = x;
                    this.CreateUpdateForm();
                });
            });
        }

        this._projectService.GetAll().subscribe(x => {
            this.listProject = x
        });

        this._taskService.GetAllParentTasks().subscribe(x => {
            this.listParentTask = x
        });

        if (this.passingProjectId > 0) {
        }
        else {
            this.CreateForm();
        }
    }

    CreateUpdateForm() {
        let currentDate = new Date();
        this.taskForm.controls['startDate'].setValue(this.datePipe.transform(this.taskInfo.startDate, 'yyyy-MM-dd'));
        this.taskForm.controls['endDate'].setValue(this.datePipe.transform(this.taskInfo.endDate, 'yyyy-MM-dd'));
        this.taskForm.controls['projectId'].setValue(this.taskInfo.projectId);
        this.taskForm.controls['projectTitle'].setValue(this.selectedProject.projectName);
        this.taskForm.controls['taskName'].setValue(this.taskInfo.taskName);
        this.taskForm.controls['taskId'].setValue(this.taskInfo.taskName);
        this.taskForm.controls['priorityValue'].setValue(this.taskInfo.priorityValue);
        //Check and Set Parent task flag
        if (this.taskInfo.parentTask != null) {
            this.isParentSelected = true;
        }
        else {
            this.isParentSelected = false;
        }
        // Check and Set Parent Task information
        if (this.taskInfo.parentTask != null) {
            this.taskForm.controls['parentTaskName'].setValue(this.taskInfo.parentTask.parent_Task);
            this.taskForm.controls['parentTaskId'].setValue(this.taskInfo.parentTask.parent_ID);
        }
        else {
            this.taskForm.controls['parentTaskName'].setValue("");
            this.taskForm.controls['parentTaskId'].setValue(-1);
        }
        //Fill User Information
        if (this.selectedProject.userInfoes != null) {
            this.taskForm.controls["firstName"].setValue(this.selectedProject.userInfoes.firstName);
            // this.taskForm.controls["lastName"].setValue(this.selectedProject.userInfoes.lastName)            
        }
    }

    CreateForm() {
        let currentDate = new Date();
        this.taskForm.controls['startDate'].setValue(this.datePipe.transform(currentDate, 'yyyy-MM-dd'));
        this.taskForm.controls['endDate'].setValue(this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd'));
    }
    public openProjectSearch() {
        this.showDialog = true;
    }

    public openParentTaskSearch() {
        this.showParentTaskDialog = true;
    }


    public openUserSearch() {
        this.showUserTaskDialog = true;
    }
    AssignSelectedproject(project: Projectview) {
        this.selectedProject = project;
        this.modalService.dismissAll();
        this.showDialog = false;
        this.taskForm.controls['projectId'].setValue(project.projectId);
        this.taskForm.controls['projectTitle'].setValue(project.projectName);
    }

    AssignSelectedUser(userObj: User) {
        this.modalService.dismissAll();
        this.showUserTaskDialog = false;
        this.taskForm.controls['userId'].setValue(userObj.userID);
        this.taskForm.controls['firstName'].setValue(userObj.firstName);
    }

    AssignSelectedParentTask(parentTaskObj: ParentTask) {
        this.selectedParent = parentTaskObj;
        this.modalService.dismissAll();
        this.showParentTaskDialog = false;
        this.taskForm.controls['parentTaskId'].setValue(parentTaskObj.parent_ID);
        this.taskForm.controls['parentTaskName'].setValue(parentTaskObj.parent_Task);
    }

    AddTask($event) {
        let task: Task;
        task = {
            task_ID: 0,
            Parent_ID: this.taskForm.controls['parentTaskId'].value,
            projectId: this.taskForm.controls['projectId'].value,
            taskName: this.taskForm.controls['taskName'].value,
            startDate: this.taskForm.controls['startDate'].value,
            endDate: this.taskForm.controls['endDate'].value,
            priorityValue: this.taskForm.controls['priorityValue'].value,
            IsParentTaskSelected: this.isParentSelected,
            Status: '',
            parentTask: null
        }

        this._taskService.Add(task).subscribe((data) => {
            this.taskForm.reset();
            this.message = "Inserted Task Successfully ";
        })
    }

    Reset() {
        this.isUpdate = false;
        this.taskForm.reset();
    }

    UpdateTask($event) {
        let task: Task;
        task = {
            task_ID: this.taskInfo.task_ID,
            Parent_ID: this.taskForm.controls['parentTaskId'].value,
            projectId: this.taskInfo.projectId,
            taskName: this.taskForm.controls['taskName'].value,
            startDate: this.taskForm.controls['startDate'].value,
            endDate: this.taskForm.controls['endDate'].value,
            priorityValue: this.taskForm.controls['priorityValue'].value,
            IsParentTaskSelected: this.isParentSelected,
            Status: '',
            parentTask: null
        }

        this._taskService.Update(task, this.taskInfo.task_ID).subscribe((data) => {
            this.taskForm.reset();
            this.message = "Updated Task Successfully ";
        })
    }

    //Start and End dates validation
    error: any = { isError: false, errorMessage: '' };
    compareTwoDates() {
        if (new Date(this.taskForm.controls['endDate'].value) < new Date(this.taskForm.controls['startDate'].value)) {
            this.error = { isError: true, errorMessage: 'End Date can not before start date' };
            this.datesValidated = true;
        } else {
            this.error = { isError: false, errorMessage: '' };
            this.datesValidated = false;
        }
    }

    public enableDisableParentTask(event: any) {
        let currentDate = new Date();
        this.isParentSelected = event.target.checked;
        if (this.isParentSelected) {
            this.isParentSelected = true;
            this.taskForm.controls['priorityValue'].enable();
            this.taskForm.controls['parentTaskName'].reset();
            this.taskForm.controls['startDate'].reset();
            this.taskForm.controls['endDate'].reset();
            this.taskForm.controls['parentTaskName'].disable();
            this.taskForm.controls['startDate'].disable();
            this.taskForm.controls['endDate'].disable();
        }
        else {

            this.isParentSelected = false;
            this.taskForm.controls['priorityValue'].enable();
            this.taskForm.controls['parentTaskName'].enable();
            this.taskForm.controls['startDate'].enable();
            this.taskForm.controls['endDate'].enable();
            this.taskForm.controls['startDate'].setValue(this.datePipe.transform(currentDate, 'yyyy-MM-dd'));
            this.taskForm.controls['startDate'].setValidators([Validators.required]);
            this.taskForm.controls['endDate'].setValue(this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd'));
            this.taskForm.controls['endDate'].setValidators([Validators.required]);
        }
    }
}