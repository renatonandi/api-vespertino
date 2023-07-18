import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public emitEvent = new EventEmitter();

  private urlBase: string = `http://localhost:8080/usuarios`;
  private userSubject = new Subject<User[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(user: User): Observable<User>{
    return this.http.post<User>(this.urlBase, user, this.httpOptions)
    .pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(user: User): Observable<User>{
    return this.http.put<User>(`${this.urlBase}/${user.id}`, user, this.httpOptions)
    .pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public delete(user:User):Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${user.id}`);
  }

  public listAll(): Observable<User[]> {
    this.http
      .get<User[]>(this.urlBase)
      .subscribe((users) => this.userSubject.next(users));
    return this.userSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    this.http
      .get<User[]>(`${this.urlBase}/name/${name}`)
      .subscribe((users) => this.userSubject.next(users));
    return this.userSubject.asObservable();
  }

  public userSelect(user: User) {
    this.emitEvent.emit([user]);
  }
}
