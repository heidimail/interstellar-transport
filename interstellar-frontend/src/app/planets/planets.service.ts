import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet } from './planets.model';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private planetsUrl: string = 'http://localhost:8080/planets';
  private planetsSubject = new BehaviorSubject<Planet[]>([]);
  public planets$ = this.planetsSubject.asObservable();
  public planetsRoute: Planet[] = [];
  public errorMessageSubject = new BehaviorSubject<string>('');
  public errorMessage$ = this.errorMessageSubject.asObservable();

  //load all planets in service to use across multiple components
  constructor(private http: HttpClient) {
    this.findAll().subscribe();
  }


  public findAll(): Observable<Planet[]> {
    return this.http
      .get<Planet[]>(this.planetsUrl)
      .pipe(
        tap((data) => this.planetsSubject.next(data)),
        catchError((errorRes) => {;
          this.errorMessageSubject.next('Error fetching planets');
          throw errorRes;
        })
      );
  }

  public save(planet: Planet): Observable<Planet> {
    return this.http.post<Planet>(this.planetsUrl, planet);
  }

  public findById(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${this.planetsUrl}/${id}`);
  }

  //TO DO: could leave this or query backend instead.
  //Since all planets and routes are loaded initially, I am filtering in frontend instead
  public findPlanetsByNodes(nodes: string[]): Planet[] {
  const allPlanets = this.planetsSubject.getValue();
  const planetMap = new Map(allPlanets.map((p) => [p.node, p]));
  return nodes
    .map((node) => planetMap.get(node))
    .filter((p): p is Planet => p !== undefined);
}
}
