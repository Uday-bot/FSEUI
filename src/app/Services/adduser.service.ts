import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { User } from '../Model/User';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url = environment.API_ENDPOINT + "User";
  constructor(private _httClinet: HttpClient, private _http: Http) {
  }

  Add(item: User): Observable<any> {
    return this._http.post(this.url + '/InsertUser', item);
  }

  Get(id: number): Observable<User[]> {
    return this._http.get(this.url + "/" + id).pipe(map((response: Response) => <User[]>response.json()));
  }
  GetAll(): Observable<User[]> {
    return this._http.get(this.url + "/Get")
      .pipe(map((response: Response) => <User[]>response.json()));
  }

  getComments(): Observable<User[]> {
    return this._http.get(this.url + "/Get").pipe(map((res: Response) => <User[]>res.json()));
  }

  GetbyName(name: string): Observable<User[]> {
    return this._http.get(this.url + "/GetByName?name=" + name)
      .pipe(map((response: Response) => <User[]>response.json()));
  }

  SortOrder(sortOrder: string, sortBy: string): Observable<User[]> {
    return this._http.get(this.url + "/Sortusers?sortOrder=" + sortOrder + "&sortBy=" + sortBy)
      .pipe(map((response: Response) => <User[]>response.json()));
  }

  Update(item: User, id: number): Observable<any> {
    return this._http.post(this.url + "/UpdateUser?Id=" + id, item)
      .pipe(map((response: Response) => <any>response));
  }
  Delete(id: number): Observable<User[]> {
    return this._http.post(this.url + "/DeleteUser?Id=" + id, null)
      .pipe(map((response: Response) => <User[]>response.json()));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
