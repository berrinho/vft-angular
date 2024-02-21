import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fieldsite } from '../fieldsite/fieldsite';
//nb - to use types like this install leaflet as follows npm install leaflet @types/leaflet
//also need to add the leaflet stylesheet to angular.json
import * as L from 'leaflet';
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
export class FieldtripComponent implements AfterViewInit {


  private map:L.Map | undefined;
  
  trip!: Fieldtrip;
  sites!: Fieldsite[];
  errorMessage: string="";
  sub!: Subscription;

  constructor(private tripService: FieldtripService, private activatedRoute: ActivatedRoute){}

  ngAfterViewInit(): void {
    this.initMap();
  }

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


  initMap(): void {
      this.map = L.map('map', {
      center: [ this.trip.ymapCoord, this.trip.xmapCoord,  ],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    for ( const site of this.sites) {
        const marker = L.marker([site.ymapCoord, site.xmapCoord ]);
        marker.bindPopup("<b>" + site.name + "</b><br><a href='/fieldsite/" + site.id + "'>Visit</a>");
        marker.addTo(this.map);

    }
  }
}
