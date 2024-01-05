import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fieldsite } from '../fieldsite/fieldsite';

import { CommonModule } from '@angular/common';
import { FieldtripService } from './fieldtrip.service';
import { Fieldtrip } from './fieldtrip';

@Component({
  selector: 'app-fieldtrip',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './fieldtrip.component.html',
  styleUrl: './fieldtrip.component.css'
})
export class FieldtripComponent {

  trip!: Fieldtrip;
  sites!: Fieldsite[];
  errorMessage: string="";
  sub!: Subscription;

  constructor(private tripService: FieldtripService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    
    var tripId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    this.sub = this.tripService.getFieldtrip( tripId ).subscribe({
      next: trip => {
        this.trip = trip;
        this.sites = trip.sortedSites;
      },
      error: err => this.errorMessage = err}
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
