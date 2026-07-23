import { Component, DestroyRef, effect, inject, signal, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PlanetsService } from './planets.service';
import { DistanceForm } from '../distance-form/distance-form';
import { PlanetsRoute } from './planets-route/planets-route';
import { Routes } from '../routes/routes.component';
import { RoutesTravelled } from '../routes-travelled/routes-travelled.component';

@Component({
  selector: 'app-planets',
  imports: [DistanceForm, AsyncPipe, PlanetsRoute, Routes, RoutesTravelled],
  templateUrl: './planets.html',
  styleUrl: './planets.scss',
})
export class Planets {
  private planetsService = inject(PlanetsService);
  planets$ = this.planetsService.planets$;
  errorMessage$ = this.planetsService.errorMessage$;
  selectedDestinationName = signal<string>('');
  distanceFound = signal<boolean>(false);
  searching = false;

  searchSubmitted(submitted: boolean) {
    this.searching = true;
    this.distanceFound.set(false);
  }

  onDestinationSelected(destinationName: string) {
    this.selectedDestinationName.set(destinationName);
  }

  onDistanceFound(found: boolean) {
    this.distanceFound.set(found);
    this.searching = false;
  }
}
