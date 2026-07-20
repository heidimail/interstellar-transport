import { Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Planet } from '../planets/planets.model';
import { RoutesService } from '../routes/routes.service';

@Component({
  selector: 'app-distance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './distance-form.html',
  styleUrl: './distance-form.scss',
})
export class DistanceForm {
  planets = input.required<Planet[]>();
  submittedSearch = signal(false);
  selectedDestinationName?: string = '';
  form = new FormGroup({
    planetDestination: new FormControl('', {
      validators: [],
    }),
  });

  private earthNode = 'A';
  protected otherPlanets = computed(() =>
    this.planets().filter(planet => planet.node !== this.earthNode)
  );

  private routesService = inject(RoutesService);

  selectDestination(planet: Planet): void {
    this.form.get('planetDestination')?.setValue(planet.node);
    this.selectedDestinationName = planet.name;
  }

  onSubmit() {
    this.routesService.findQuickestRoute(
      this.form.value.planetDestination!,
    );
    this.submittedSearch.set(true);
  }
}
