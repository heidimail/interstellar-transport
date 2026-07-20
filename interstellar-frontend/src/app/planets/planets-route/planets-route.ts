import { Component, inject, signal } from '@angular/core';
import { RoutesService } from '../../routes/routes.service';
import { PlanetsService } from '../planets.service';
import { Planet } from '../planets.model';

@Component({
  selector: 'app-planets-route',
  imports: [],
  templateUrl: './planets-route.html',
  styleUrl: './planets-route.scss',
})
export class PlanetsRoute {
  routePlanets: Planet[] = [];
  private routesService = inject(RoutesService);
  private planetsService = inject(PlanetsService);

  ngDoCheck() {
    const routeTaken = this.routesService.getRouteTaken();
    if (routeTaken.length) {
      console.log('routeTaken', routeTaken);
      //get all nodes and then make sure unique
      const nodes = routeTaken.flatMap(route => [route.planetOrigin, route.planetDestination]);
      const uniqueNodes = Array.from(new Set(nodes));
      console.log('uniqueNodes', uniqueNodes);
      //take the unque node list and get the planets from the planet service
      const planets = this.planetsService.findPlanetsByNodes(uniqueNodes as string[]);
      this.routePlanets = planets;
    }
  }


}
