import { Component, computed, inject, input, output, signal } from '@angular/core';
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
  submittedSearch = output<boolean>();
  selectedDestinationName = output<string>();
  protected selectedDestination = signal<string>('');
  
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
    this.selectedDestination.set(planet.name);
    this.selectedDestinationName.emit(planet.name);
  }

  onSubmit() {
    this.routesService.findQuickestRoute(
      this.form.value.planetDestination!,
    );
    this.submittedSearch.emit(true);

  }
}
