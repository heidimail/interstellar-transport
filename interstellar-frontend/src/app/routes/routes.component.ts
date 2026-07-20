import { Component, DestroyRef, DoCheck, effect, inject, OnInit, signal } from '@angular/core';
import { RoutesService } from './routes.service';
import { Route } from './routes.model';
import { PlanetsService } from '../planets/planets.service';

@Component({
  selector: 'app-routes',
  imports: [],
  templateUrl: './routes.html',
  styleUrl: './routes.scss',
})
export class Routes implements OnInit {
  private destroyRef = inject(DestroyRef);
  routes = signal<Route[]>([]);
  error = signal('');
  totalDistance = signal(0);
  routeTaken = signal<Route[]>([]);

  constructor(private routesService: RoutesService,
    private planetsService: PlanetsService,
  ) {
     effect(() => {
      console.log('routes changed:', this.routes());
    });
  }

  ngOnInit(): void {
    // TODO: remove and add similar funciton in routes services same as get all planets in planets service
    const subscription = this.routesService.findAllRoutes().subscribe({
      next: (data) => {
        this.routes.set([...this.routes(), ...data]);
      },
      error: (err) => {
        console.error('Error fetching routes', err);
        this.error.set(err.message);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngDoCheck() {
    //update totalDistanc from the routes.service.ts
    this.totalDistance.set(this.routesService.getTotalDistance());
  }

 
}
