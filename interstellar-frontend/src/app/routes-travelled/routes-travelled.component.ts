import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RoutesTravelledService } from './routes-travelled.service';

@Component({
  selector: 'app-routes-travelled',
  imports: [DatePipe],
  templateUrl: './routes-travelled.html',
  styleUrl: './routes-travelled.scss',
})
export class RoutesTravelled implements OnInit {
  protected routesTravelledService = inject(RoutesTravelledService);

  ngOnInit(): void {
    this.routesTravelledService.findAll().subscribe();
  }
}
