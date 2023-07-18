import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Speedway } from '../models/speedway';

@Injectable({
  providedIn: 'root'
})
export class SpeedwayService {

  constructor(private http: HttpClient) {}

  public emitEvent = new EventEmitter();

  private urlBase: string = `http://localhost:8080/pista`;
  private speedwaySubject = new Subject<Speedway[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(speedway: Speedway): Observable<Speedway>{
    return this.http.post<Speedway>(this.urlBase, speedway, this.httpOptions)
    .pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(speedway: Speedway): Observable<Speedway>{
    return this.http.put<Speedway>(`${this.urlBase}/${speedway.id}`, speedway, this.httpOptions)
    .pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public delete(speedway:Speedway):Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${speedway.id}`);
  }

  public listAll(): Observable<Speedway[]> {
    this.http
      .get<Speedway[]>(this.urlBase)
      .subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }

  public getSpeedwayByName(name: string): Observable<Speedway[]> {
    this.http
      .get<Speedway[]>(`${this.urlBase}/name/${name}`)
      .subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }

  public speedwaySelect(speedway: Speedway) {
    this.emitEvent.emit([speedway]);
  }
}
