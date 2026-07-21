import { Component, DestroyRef, DoCheck, effect, inject, OnInit, output, signal } from '@angular/core';
import { RoutesService } from './routes.service';
import { Route } from './routes.model';

@Component({
  selector: 'app-routes',
  imports: [],
  templateUrl: './routes.html',
  styleUrl: './routes.scss',
})
export class Routes implements OnInit {
  private destroyRef = inject(DestroyRef);
  private routesService = inject(RoutesService);
  routes = signal<Route[]>([]);
  error = signal('');
  
  distanceFound = output<boolean>();

  totalDistance = this.routesService.totalDistance;
  routeTaken = this.routesService.routeTaken;

 constructor() {
  effect(() => {
    if (this.routeTaken().length) {
      this.distanceFound.emit(true);
    }
  });
}

  ngOnInit(): void {
    const subscription = this.routesService.findAllRoutes().subscribe({
      next: (data) => {
        this.routes.set([...this.routes(), ...data]);
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
