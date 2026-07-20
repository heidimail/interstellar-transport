import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PlanetsService } from './planets.service';
import { DistanceForm } from '../distance-form/distance-form';
import { PlanetsRoute } from "./planets-route/planets-route";
import { Routes } from '../routes/routes.component';

@Component({
  selector: 'app-planets',
  imports: [DistanceForm, AsyncPipe, PlanetsRoute, Routes],
  templateUrl: './planets.html',
  styleUrl: './planets.scss',
})
export class Planets {
  private planetsService = inject(PlanetsService);
  planets$ = this.planetsService.planets$;
  errorMessage$ = this.planetsService.errorMessage$;
}
