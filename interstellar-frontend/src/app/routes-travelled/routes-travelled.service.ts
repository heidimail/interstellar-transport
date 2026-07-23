import { Injectable, signal } from '@angular/core';
import { RoutesTravelled } from './routes-travelled.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class RoutesTravelledService {
  private routesTravelledSignal = signal<RoutesTravelled[]>([]);
  public routesTravelled = this.routesTravelledSignal.asReadonly();
  constructor(private http: HttpClient) {}

  public save(routeTravelled: RoutesTravelled): Observable<RoutesTravelled> {
    return this.http.post<RoutesTravelled>('http://localhost:8080/routeTravelled', routeTravelled);
  }

  public findAll(): Observable<RoutesTravelled[]> {
    return this.http.get<RoutesTravelled[]>('http://localhost:8080/routesTravelled').pipe(
      tap((routesTravelled) => {
        this.routesTravelledSignal.set(routesTravelled);
      }),
    );
  }
}
