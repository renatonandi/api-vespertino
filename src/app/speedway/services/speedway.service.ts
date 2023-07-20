import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap, forkJoin } from 'rxjs';
import { Speedway } from '../models/speedway';
import { Country } from 'src/app/country/models/country';

@Injectable({
  providedIn: 'root',
})
export class SpeedwayService {
  constructor(private http: HttpClient) {}
  public busca: boolean = false;

  public emitEvent = new EventEmitter();

  public eventoBotao = new EventEmitter();

  private urlBase: string = `http://localhost:8080/pista`;
  private speedwaySubject = new Subject<Speedway[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public botaoBusca(){
    this.busca = !this.busca;
    this.eventoBotao.emit(this.busca);
  }
  
  public listAll(): Observable<Speedway[]> {
    this.http
      .get<Speedway[]>(this.urlBase)
      .subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }

  public insert(speedway: Speedway): Observable<Speedway> {
    return this.http
      .post<Speedway>(this.urlBase, speedway, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public update(speedway: Speedway): Observable<Speedway> {
    return this.http
      .put<Speedway>(
        `${this.urlBase}/${speedway.id}`,
        speedway,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(speedway: Speedway): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${speedway.id}`);
  }

  

  public getSpeedwayByName(name: string): Observable<Speedway[]> {
    if (name === '') {
      this.listAll();
    } else {
      this.http
        .get<Speedway[]>(`${this.urlBase}/name/${name}`)
        .subscribe((speedways) => this.speedwaySubject.next(speedways));
    }
    return this.speedwaySubject.asObservable();
  }

  public speedwaySelect(speedway: Speedway) {
    this.emitEvent.emit(speedway);
  }

  public getSpeedwayByCountry(country: Country): Observable<Speedway[]> {
      this.http
        .get<Speedway[]>(`${this.urlBase}/pais/${country.id}`)
        .subscribe((speedways) => this.speedwaySubject.next(speedways));
    
    return this.speedwaySubject.asObservable();
  }

  public getSpeedwaySizeBetween(sizeI: number, sizeF: number){
    this.http.get<Speedway[]>(`${this.urlBase}/size/${sizeI}/${sizeF}`).subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }

}
