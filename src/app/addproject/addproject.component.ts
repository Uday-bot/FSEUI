import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from 'src/app/Model/Project';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { DatePipe } from '@angular/common';
import { Projectview } from 'src/app/Model/projectview';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/adduser.service';
import { User } from 'src/app/Model/user';
@Component({
    selector: 'app-addproject',
    templateUrl: './addproject.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./addproject.component.css'],
    providers: [DatePipe]
})
export class AddprojectComponent implements OnInit {
    isUpdate = false;
    isAdd = true;
    isSearchingProject = false;
    project: Project = new Project();
    projectList: Projectview[];
    datesValidated = false;
    users: User[];
    selectedManager: User;
    sortbycolumn: string = "startDate";
    sortOrder:boolean = false;
    showDialog: boolean = false;
    message: string;
    projectsearchname: string = '';
    projectForm = new FormGroup({
        projectTitle: new FormControl(''),
        priorityValue: new FormControl('15'),
        setDates: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        managerId: new FormControl(''),
        managerName: new FormControl('')
    });

    constructor(
        private datePipe: DatePipe,
        private fb: FormBuilder,
        private projectService: ProjectService,
        private userService: UserService,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.createForm();
        this.message = "";
        this.projectForm.controls['startDate'].disable();
        this.projectForm.controls['endDate'].disable();
        this.projectForm.controls['managerName'].disable();
        this.getProjects();
        this.userService.GetAll().subscribe(usersdata => {
            this.users = usersdata;
        });
    }

    private createForm() {
        let setDates = false;
        if (this.project != null) {
            let _tempproject = this.project
            if (_tempproject.StartDate != null)
            setDates = false;
            this.projectForm = this.fb.group({
                projectTitle: new FormControl(this.project.ProjectName, Validators.required),
                priorityValue: new FormControl(this.project.Priority == 0 ? '15' : this.project.Priority),
                managerId: new FormControl(this.project.UserId),
                managerName: new FormControl(this.project.ManagerName),
                setDates: [setDates],
                startDate: new FormControl(this.project.StartDate),
                endDate: new FormControl(this.project.EndDate)
            });
        }
    }

    SelectedUser(user: User) {
        this.selectedManager = user;
        this.modalService.dismissAll();
        this.showDialog = false;
        this.projectForm.controls['managerName'].setValue(user.firstName);
        this.projectForm.controls['managerId'].setValue(user.userID);
    }

    public addNewProject($event) {
        let project: Project;
        project = {
            'ProjectId': 0,
            'ProjectName': this.projectForm.controls['projectTitle'].value,
            'Priority': this.projectForm.controls['priorityValue'].value,
            'UserId': this.selectedManager.userID,
            'StartDate': this.projectForm.controls['startDate'].value != null ? this.datePipe.transform(this.projectForm.controls["startDate"].value, 'yyyy-MM-dd HH:mm:ss') : '',
            'EndDate': this.projectForm.controls['endDate'].value != null ? this.datePipe.transform(this.projectForm.controls["endDate"].value, 'yyyy-MM-dd HH:mm:ss') : '',
            'IsSuspend': false,
            'ManagerName': this.projectForm.controls['managerName'].value,
        };
        this.projectService.Add(project).subscribe((res) => {
            this.projectForm.reset();
            this.getProjects();
            this.message = "Inserted successfully ";
        })
    }

    private getProjects() {
        return this.projectService.GetAll().subscribe(projects => {
            this.projectList = projects;
        });
    }

    public resetProjectForm($event) {
        this.projectForm.reset();
        this.projectForm.controls['startDate'].disable();
        this.projectForm.controls['endDate'].disable();
        this.message = "";
    }

    public enableDisableDates(event: any) {
        if (!this.projectForm.controls['setDates'].value) {
            this.projectForm.controls['startDate'].enable();
            this.projectForm.controls['endDate'].enable();
        }
        else {
            this.projectForm.controls['startDate'].disable();
            this.projectForm.controls['endDate'].disable();
        }
        if (!this.projectForm.controls['setDates'].value) {

            this.projectForm.controls['startDate'].enable();
            this.projectForm.controls['endDate'].enable();
            this.projectForm.controls['startDate'].setValidators([Validators.required]);
            this.projectForm.controls['endDate'].setValidators([Validators.required]);
            let currentDate = new Date();
            this.projectForm.controls['startDate'].setValue(this.datePipe.transform(currentDate, 'yyyy-MM-dd'), Validators.required)
            this.projectForm.controls['endDate'].setValue(this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd'));
            this.error = { isError: false, errorMessage: '' };
            this.datesValidated = false;
        } else {
            this.projectForm.controls['startDate'].reset();
            this.projectForm.controls['startDate'].disable();
            this.projectForm.controls['endDate'].reset();
            this.projectForm.controls['endDate'].disable();
        }
    }

    public openUserSearch() {
        this.showDialog = true;
    }

    setSelectedUser(user: any) {
        this.projectForm.controls['managerId'].setValue(user.userId);
        this.projectForm.controls['managerName'].setValue(user.firstName + ' ' + user.lastName);
        this.showDialog = false;
    }

    public editProject(item: Projectview) {
        this.project = {
            'ProjectId': item.projectId,
            'ProjectName': item.projectName,
            'Priority': item.priority,
            'UserId': item.userId,
            'StartDate': this.datePipe.transform(item.startDate, 'yyyy-MM-dd'),
            'EndDate': this.datePipe.transform(item.endDate, 'yyyy-MM-dd'),
            'IsSuspend': false,
            'ManagerName': item.managerName
        };
        this.projectForm.controls['startDate'].enable();
        this.projectForm.controls['endDate'].enable();
        this.createForm();
        if (this.project.StartDate != null) {
            this.projectForm.controls['startDate'].enable();
            this.projectForm.controls['endDate'].enable();
            this.projectForm.controls['startDate'].setValidators([Validators.required]);
            this.projectForm.controls['endDate'].setValidators([Validators.required]);
            this.projectForm.controls['setDates'].setValue(true);
        } else {
            this.projectForm.controls['startDate'].disable();
            this.projectForm.controls['endDate'].disable();
            this.projectForm.controls['startDate'].clearValidators();
            this.projectForm.controls['endDate'].clearValidators();
            this.projectForm.controls['setDates'].setValue(false);
        }

        if (!this.isUpdate)
            this.toggleButton();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    public deleteProject(id: number) {
        this.projectService.Delete(id)

            .subscribe(

                (result) => this.projectList = result,
                err => this.message = <any>err,               
                () => {
                    this.projectForm.reset();
                    this.getProjects();
                    this.message = "Deleted successfully ";
                    if (!this.isUpdate)
                        this.toggleButton();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                })
    }

    public updateProjectDetails($event) {
        let temp: Project;
        temp = {
            'ProjectId': this.project.ProjectId,
            'ProjectName': this.projectForm.controls['projectTitle'].value,
            'Priority': this.projectForm.controls['priorityValue'].value,
            'UserId': this.projectForm.controls['managerId'].value,
            'StartDate': this.projectForm.controls['startDate'].value != null ? this.datePipe.transform(this.projectForm.controls["startDate"].value, 'yyyy-MM-dd HH:mm:ss') : '',
            'EndDate': this.projectForm.controls['endDate'].value != null ? this.datePipe.transform(this.projectForm.controls["endDate"].value, 'yyyy-MM-dd HH:mm:ss') : '',
            'IsSuspend': false,
            'ManagerName': this.projectForm.controls['managerName'].value
        };
        this.project = null;
        this.projectService.Update(temp, temp.ProjectId).subscribe((res) => {
            this.projectForm.reset();
            this.getProjects();
            this.message = "Updated successfully ";
            if (this.isUpdate)
                this.toggleButton();
        })
    }

    public suspendProject(id: any) {
        this.projectService.Delete(id).subscribe((projects) => {
            alert('Project Suspended succesfully!');
            this.projectList = projects;
        });
    }

    public onSearchProject(event: any) {
        let query = event.target.value;
        this.isSearchingProject = true;
        this.projectService.GetbyName(query).subscribe(projects => {
            this.projectList = projects;
        });
    }

    public filterProject(event: any){
        this.projectsearchname = event.target.value;
    }

    public sortProjects(sortBy: string) {
        this.sortbycolumn = sortBy;
        this.sortOrder = !this.sortOrder;        
    }

    public cancelProjectUpdate($event) {
        this.project = null;
        this.createForm();
        if (this.isUpdate)
            this.toggleButton();
    }

    private toggleButton() {
        this.isAdd = !this.isAdd;
        this.isUpdate = !this.isUpdate;
    }

    error: any = { isError: false, errorMessage: '' };
    compareTwoDates() {
        if (new Date(this.projectForm.controls['endDate'].value) < new Date(this.projectForm.controls['startDate'].value)) {
            this.error = { isError: true, errorMessage: 'End Date can not before start date' };
            this.datesValidated = true;
        } else {
            this.error = { isError: false, errorMessage: '' };
            this.datesValidated = false;
        }
    }

}
