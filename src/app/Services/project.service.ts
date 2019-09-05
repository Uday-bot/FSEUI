import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Projectview } from '../Model/ProjectView';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Project } from '../Model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url: string = environment.API_ENDPOINT + "Project";
  constructor(private _http: Http) { }

  GetAll(): Observable<Projectview[]> {
    return this._http.get(this.url + "/Get")
      .pipe(map((response: Response) => <Projectview[]>response.json()));
  }

  Get(id: number): Observable<Projectview[]> {
    return this._http.get(this.url + "/" + id)
      .pipe(map((response: Response) => <Projectview[]>response.json()));
  }

  GetByProjectId(id: number): Observable<Projectview> {
    return this._http.get(this.url + "/" + id)
      .pipe(map((response: Response) => <Projectview>response.json()));
  }

  GetbyName(name: string): Observable<Projectview[]> {
    return this._http.get(this.url + "?name=" + name)
      .pipe(map((response: Response) => <Projectview[]>response.json()));
  }

  Add(item: Project): Observable<any> {
    return this._http.post(this.url + "/InsertProject", item)
      .pipe(map((response: Response) => <any>response));
  }
  Update(item: Project, id: number): Observable<any> {
    return this._http.post(this.url + "/UpdateProject?Id=" + id, item)
      .pipe(map((response: Response) => <any>response));
  }
  Delete(id: number): Observable<Projectview[]> {
    return this._http.post(this.url + "/DeleteProject?Id=" + id, null)
      .pipe(
        map((response: Response) => <Projectview[]>response.json()),
        retry(1),
        catchError(this.handleError)
        // catchError((res: Response) => this.onError(res))
      );
  }

  onError(res: Response) {
    const statusCode = res.status;
    const body = res.json();
    const error = {
      statusCode: statusCode,
      error: body.error
    };
    return throwError(error);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError("Error occured in delete");
  }

}
