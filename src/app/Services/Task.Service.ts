import { ParentTask } from '../Model/ParentTask';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Task } from '../Model/Task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class Taskservice {
  private taskurl = environment.API_ENDPOINT + "Task";
  constructor(private _httpClient: HttpClient, private _http: Http) {
  }
  GetAllTask(): Observable<Task[]> {
    return this._http.get(this.taskurl + "/Get").pipe(
      map((response: Response) => <Task[]>response.json())
    );
  }

  GetAllParentTasks(): Observable<ParentTask[]> {
    return this._http.get(this.taskurl + "/GetParent")
      .pipe(
        map((response: Response) => <ParentTask[]>response.json())
      );
  }

  Add(item: Task): Observable<any> {
    return this._http.post(this.taskurl + "/InsertTask", item)
      .pipe(map((response: Response) => <any>response));
  }

  GetTaskByProjectId(projectId: number): Observable<Task[]> {
    return this._http.get(this.taskurl + "/GetTaskByProject/" + projectId)
      .pipe(
        map((response: Response) => <Task[]>response.json())
      );
  }

  GetTaskByTaskId(taskId: number): Observable<Task> {
    return this._http.get(this.taskurl + "/GetTaskByTaskId/" + taskId)
      .pipe(
        map((response: Response) => <Task>response.json())
      );
  }

  Update(item: Task, taskId: number): Observable<any> {
    return this._http.post(this.taskurl + "/UpdateTask?Id=" +  taskId, item)
      .pipe(map((response: Response) => <any>response));
  }

  EndTask(taskId: number): Observable<Boolean> {
    return this._http.post(this.taskurl + "/EndTask/" + taskId, "")
      .pipe(map((response: Response) => <any>response));
  }
}