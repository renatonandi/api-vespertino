import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public emitEvent = new EventEmitter();

  public user = {} as User[];

  private urlBase: string = `http://localhost:8080/usuarios`;

  private usersSbject = new Subject<User[]>();


  public listAll(): Observable<User[]> {
    this.http
      .get<User[]>(this.urlBase)
      .subscribe((users) => this.usersSbject.next(users));
    return this.usersSbject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    this.http
      .get<User[]>(`${this.urlBase}/name/${name}`)
      .subscribe((users) => this.usersSbject.next(users));
    return this.usersSbject.asObservable();
  }

  public userSelect(user: User, i: number) {
    let userSelect: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roles: user.roles,
    };
    this.emitEvent.emit([userSelect, i]);
  }
}
