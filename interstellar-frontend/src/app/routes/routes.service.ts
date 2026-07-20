import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Route } from './routes.model';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Planet } from '../planets/planets.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private routesUrl: string;
  private routes = signal<Route[]>([]);
  private routeOptions: Route[] = [];
  private destinationPlanet: string = '';
  private routeCount: number = 0;
  private totalDistance: number = 0;
  private routeTaken: Route[] = [];
//   private planets = signal<Planet[]>([]);

// maybe below create observable instead?
  public getTotalDistance(): number {
    return this.totalDistance;
  }

  public getRouteTaken(): Route[] {
    return this.routeTaken;
  }

  constructor(private http: HttpClient) {
    this.routesUrl = 'http://localhost:8080/routes';
  }

  public findAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.routesUrl).pipe(tap((routes) => this.routes.set(routes)));
  }

  public save(route: Route): Observable<Route> {
    return this.http.post<Route>(this.routesUrl, route);
  }

  public findById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.routesUrl}/${id}`);
  }

  //TO DO: below gets quickest route. Will need to also figure out quickest distance...  
  public findQuickestRoute(planetDestination: string): void {
    //reset routeTaken and totalDistance and routeOptions
    this.routeTaken = [];
    this.totalDistance = 0;
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
    console.log('Starting routes:', startingRoutes);
    console.log('Ending routes:', endingRoutes);

    // Check for a direct route first — same route satisfying both origin and destination
    //move to central location?
    //TO DO: need to add to routeTaken.
    const directRoute = startingRoutes.find((start) =>
      endingRoutes.some((end) => end.id === start.id),
    );
    if (directRoute) {
        this.routeTaken = [directRoute];
        this.addUpRouteDistances(this.routeTaken);
      console.log('Direct route found:', directRoute);
      return;
    }

    this.routeCount = 1;
    let foundConnectingRoute = false;
    for (const startRoute of startingRoutes) {
      for (const endRoute of endingRoutes) {
        if (startRoute.planetDestination === endRoute.planetOrigin) {
            //TO DO>::: need to add to route taken
            this.routeTaken = [startRoute, endRoute];
            this.addUpRouteDistances(this.routeTaken);
          console.log('Potential connecting route:', startRoute, '->', endRoute);
          foundConnectingRoute = true;
          return; // Found a connecting route, no need to continue searching
        }
      }
    }
    if (!foundConnectingRoute) {
      console.log('No route found from starting routes to ending routes');
      this.getNextBestRoute();
    }
  }

  private getNextBestRoute(): void {
    this.routeCount++;
    console.log('Route count:', this.routeCount);
    console.log('Evaluating next best route from route options:', this.routeOptions);
    if (this.routeOptions.length === 0) {
      console.log('No route options available');
      return;
    }
    // Implement logic to evaluate and select the next best route from this.routeOptions
    // For now, just log the first available route as the next best route
    const startingPlanetDestination = [];
    for (const startRoute of this.routeOptions) {
      startingPlanetDestination.push(startRoute.planetDestination);
    }
    console.log('startingPlanetDestination:', startingPlanetDestination);
    //find any middle rouest that have the desitination as the origin
    // const routeOptions: Route[] = [];
    //take the startingPLanetDestinations, look at routes and find the next planetOrigins that match.
    for (const route of this.routes()) {
      if (startingPlanetDestination.includes(route.planetOrigin)) {
        //before adding to routeOptions, check that it isn't already in there
        if (this.routeOptions.some(existingRoute => existingRoute.planetOrigin === route.planetOrigin && existingRoute.planetDestination === route.planetDestination)) {
          continue; // Skip adding duplicate route
        }
        this.routeOptions.push(route);
      }
    }

      console.log('Updated route options after evaluating next best route:', this.routeOptions);
    const matchingRoute = this.routeOptions.find(route => route.planetDestination === this.destinationPlanet);
    //move below to separate function to get planets by route taken
    if (matchingRoute) {
      console.log('Found a route that reaches the destination in next best route FUNCTION:', matchingRoute);
     
      let currentRoute = matchingRoute;
      // Add the matching route as the starting point for backtracking
      this.routeTaken.push(currentRoute); // Add the matching route as the starting point for backtracking`
      for (let i = 0; i < this.routeCount; i++) {
        const previousRoute = this.routeOptions.find(route => route.planetDestination === currentRoute.planetOrigin);
        if (!previousRoute) {
          break;
        }
        console.log(`Backtracking step ${i + 1}:`, previousRoute);
        this.routeTaken.push(previousRoute);
        currentRoute = previousRoute;
      }
      this.routeTaken.reverse(); //reverse route to get the correct order from origin to destination
      console.log('route taken to reach the matching route:', this.routeTaken);
      this.addUpRouteDistances(this.routeTaken);
      // You can continue backtracking further if needed by repeating the process above.

    //   console.log('Route taken to reach the matching route:', routeTaken);
      return; // Stop further processing as we found a route that reaches the destination
    } 
   
    console.log('no matching route found in next best route function');
    //if no routes, re go through this.getNextBestRoute() again to explore further options
    //if (this.routeOptions.length > 0) {
     this.getNextBestRoute();
    //}
  
  }

    private addUpRouteDistances(routeTaken: Route[]): void {
    let totalDistance = 0;
    for (const route of routeTaken) {
        totalDistance += parseFloat(route.distance);
    }
    this.totalDistance = Math.round(totalDistance * 100) / 100; // round to 2 decimals
    console.log('Total distance for the route taken:', this.totalDistance);
    }

}
