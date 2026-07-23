import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Route } from './routes.model';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { RoutesTravelledService } from '../routes-travelled/routes-travelled.service';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private routesUrl: string;
  private routes = signal<Route[]>([]);
  private routeOptions: Route[] = [];
  private destinationPlanet: string = '';
  private routeCount: number = 0;

  private totalDistanceSignal = signal(0);
  private routeTakenSignal = signal<Route[]>([]);

  public totalDistance = this.totalDistanceSignal.asReadonly();
  public routeTaken = this.routeTakenSignal.asReadonly();

  constructor(private http: HttpClient, private routesTravelledService: RoutesTravelledService) {
    this.routesUrl = 'http://localhost:8080/routes';
  }

  public findAllRoutes(): Observable<Route[]> {
    //TO DO: add error handling here and in component
    return this.http.get<Route[]>(this.routesUrl).pipe(tap((routes) => this.routes.set(routes)));
  }

  //Currently not used
  public save(route: Route): Observable<Route> {
    return this.http.post<Route>(this.routesUrl, route);
  }

  //currently not used
  public findById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.routesUrl}/${id}`);
  }

  //TO DO: move find quickest route logic to backend instead
  //TO DO: below gets quickest route. Will need to also figure out quickest distance...
  public findQuickestRoute(planetDestination: string): void {
    this.routeTakenSignal.set([]);
    this.totalDistanceSignal.set(0);
    this.routeOptions = [];
    this.destinationPlanet = '';
    const planetOrigin = 'A';
    const startingRoutes: Route[] = [];
    const endingRoutes: Route[] = [];
    for (const route of this.routes()) {
      if (route.planetOrigin === planetOrigin) {
        this.routeOptions.push(route);
        startingRoutes.push(route);
      }
      if (route.planetDestination === planetDestination) {
        this.destinationPlanet = planetDestination;
        endingRoutes.push(route);
      }
    }

    this.evaluateRoute(startingRoutes, endingRoutes);
  }

  private evaluateRoute(startingRoutes: Route[], endingRoutes: Route[]): void {
    const directRoute = startingRoutes.find((start) =>
      endingRoutes.some((end) => end.id === start.id),
    );
    if (directRoute) {
      this.finalizeRoute([directRoute]);
      return;
    }

    this.routeCount = 1;
    for (const startRoute of startingRoutes) {
      for (const endRoute of endingRoutes) {
        if (startRoute.planetDestination === endRoute.planetOrigin) {
              this.finalizeRoute([startRoute, endRoute]);
          return;
        }
      }
    }

    this.getNextBestRoute();
  }

  private getNextBestRoute(): void {
    this.routeCount++;

    if (this.routeOptions.length === 0) {
      return;
    }

    const startingPlanetDestination = [];
    for (const startRoute of this.routeOptions) {
      startingPlanetDestination.push(startRoute.planetDestination);
    }

    for (const route of this.routes()) {
      if (startingPlanetDestination.includes(route.planetOrigin)) {
        if (
          this.routeOptions.some(
            (existingRoute) =>
              existingRoute.planetOrigin === route.planetOrigin &&
              existingRoute.planetDestination === route.planetDestination,
          )
        ) {
          continue;
        }
        this.routeOptions.push(route);
      }
    }

    const matchingRoute = this.routeOptions.find(
      (route) => route.planetDestination === this.destinationPlanet,
    );
    
    if (matchingRoute) {
      const routeTaken: Route[] = [matchingRoute];
      let currentRoute = matchingRoute;
      for (let i = 0; i < this.routeCount; i++) {
        const previousRoute = this.routeOptions.find(
          (route) => route.planetDestination === currentRoute.planetOrigin,
        );
        if (!previousRoute) break;
        routeTaken.push(previousRoute);
        currentRoute = previousRoute;
      }
      routeTaken.reverse();

      this.finalizeRoute(routeTaken);

      return;
    }

    //re-run through function until a route is found that reaches the destination
    this.getNextBestRoute();
  }

  private addUpRouteDistances(routeTaken: Route[]): void {
    let totalDistance = 0;
    for (const route of routeTaken) {
      totalDistance += parseFloat(route.distance);
    }
    const total = Math.round(totalDistance * 100) / 100;
    this.totalDistanceSignal.set(total);
  }

   private finalizeRoute(routeTaken: Route[]): void {
    this.routeTakenSignal.set(routeTaken);
    this.addUpRouteDistances(routeTaken);
    this.persistRouteTravelled(routeTaken);
  }

  private persistRouteTravelled(routeTaken: Route[]): void {
    const planetsOnRoute = [
      routeTaken[0].planetOrigin,
      ...routeTaken.map((route) => route.planetDestination)
    ].join(',');
    this.routesTravelledService
      .save({
        planetDestination: this.destinationPlanet,
        totalDistance: this.totalDistance(),
        planetsOnRoute
      })
      .subscribe({
        next: () => this.routesTravelledService.findAll().subscribe(),
        error: (err) => console.error('Failed to save route travelled:', err),
      });
  }
}
