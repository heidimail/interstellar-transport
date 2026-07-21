import { Component, inject, signal, effect } from '@angular/core';
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

  constructor() {
     effect(() => {
       const routeTaken = this.routesService.routeTaken();
       if (routeTaken.length) {
         const nodes = routeTaken.flatMap(route => [route.planetOrigin, route.planetDestination]);
         const uniqueNodes = Array.from(new Set(nodes));
         const planets = this.planetsService.findPlanetsByNodes(uniqueNodes as string[]);
         this.routePlanets = planets;
       }
     });
   }

}
