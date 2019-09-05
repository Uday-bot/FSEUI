
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/adduser.service';
import { Pipe, PipeTransform } from '@angular/core'

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  isUpdate = false;
  isAdd = true;
  isSearchingUser = false;
  user: User = new User();
  userlist: User[];
  userForm: FormGroup;
  sortbycolumn: string = 'firstName';
  message: string = '';
  searchStr : string = '';
  constructor(private fb: FormBuilder, private userService: UserService) {

  }

  ngOnInit() {
    this.getUsers();
    this.createForm();

  }

  private createForm() {
    this.userForm = this.fb.group({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      employeeID: new FormControl(this.user.employeeID, [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  public addNewUser(user: User) {
    user.userID = 0;
    this.userService.Add(user).subscribe((res) => {
      this.userForm.reset();
      this.getUsers();
      this.createForm();
      this.message = "User sddedd successfully"
    })

  }

  private getUsers() {
    return this.userService.GetAll().subscribe((users) => {
      this.userlist = users;
    });
  }

  public editUser(item: any) {
    this.user = item;

    this.createForm();
    if (!this.isUpdate)
      this.toggleButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // this.message = "User updated successfully"
  }

  public reset($event) {

    this.userForm.reset();
    this.message = '';
  }

  public updateUser($event) {

    let tempUser: User;
    tempUser = {
      'userID': this.user.userID,
      'firstName': this.userForm.controls['firstName'].value,
      'lastName': this.userForm.controls['lastName'].value,
      'employeeID': this.userForm.controls['employeeID'].value,
      // 'IsActive':true
    };
    this.user = null;
    this.userService.Update(tempUser, tempUser.userID).subscribe((data) => {
      this.userForm.reset();
      this.getUsers();
      this.message = "User updated successfully"
      if (this.isUpdate)
        this.toggleButton();
    })
  }

  public deleteUser(Id: number) {
    this.userService.Delete(Id).subscribe((users) => {
      this.getUsers();
      if (this.isUpdate)
        this.toggleButton();;
      this.message = "User deleted successfully"
    })
  }

  public onSearch(event: any) {
    let query = event.target.value;
    this.isSearchingUser = true;
    if (typeof query != 'undefined' && query) {
      if (isNaN(query)) {
        this.userService.GetbyName(query).subscribe(users => { this.userlist = users; });
      }
      else {
        this.userService.Get(query).subscribe(users => { this.userlist = users; });
      }
    }
    else {
      this.userService.GetAll().subscribe(users => { this.userlist = users; });
    }
  }

  sortOrder = 'DESC';
  public sortUsers(sortBy: string) {
    this.sortOrder = (this.sortOrder == "DESC" ? "ASC" : "DESC");
    this.sortbycolumn = sortBy;
    this.userService.SortOrder(this.sortOrder, sortBy).subscribe(users => { this.userlist = users; });
  }
  public cancelUserUpdate($event) {
    this.user = new User();
    this.message = '';
    this.createForm();
    if (this.isUpdate)
      this.toggleButton();
  }

  private toggleButton() {
    this.isAdd = !this.isAdd;
    this.isUpdate = !this.isUpdate;
  }
}
