import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {}

  public emitEvent = new EventEmitter();

  private urlBase: string = `http://localhost:8080/pais`;
  private countrySubject = new Subject<Country[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<Country[]> {
    this.http
      .get<Country[]>(this.urlBase)
      .subscribe((countries) => this.countrySubject.next(countries));
    return this.countrySubject.asObservable();
  }

  public countrySelect(country: Country) {
    this.emitEvent.emit([country]);
  }

  public delete(country: Country):Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${country.id}`);
  }
  
  public insert(country: Country): Observable<Country>{
    return this.http.post<Country>(this.urlBase, country, this.httpOptions)
    .pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(country: Country): Observable<Country>{
    return this.http.put<Country>(`${this.urlBase}/${country.id}`, country, this.httpOptions)
    .pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public getCountryByName(name: string): Observable<Country[]> {
    this.http
      .get<Country[]>(`${this.urlBase}/name/${name}`)
      .subscribe((countries) => this.countrySubject.next(countries));
    return this.countrySubject.asObservable();
  }

  
  
}
