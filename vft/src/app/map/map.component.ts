import { AfterViewInit, Component } from '@angular/core';
import { FieldtripService } from '../fieldtrip/fieldtrip.service';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{

  constructor(private fieldTripService: FieldtripService){}
  errorMessage: String = "";
  trips$ = this.fieldTripService.fieldTripList$;
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }


  initMap(): void {
      this.map = L.map('map', {
      center: [56.292, 0.110],
      zoom: 5,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.trips$.subscribe({
      next: triplist => {
        for (let trip of triplist){
          const marker = L.marker([trip.ymapCoord, trip.xmapCoord ]);
          marker.bindPopup("<b>" + trip.name + "</b><br><a href='/fieldtrip/" + trip.id + "'>Visit</a>");
          marker.addTo(this.map);
          console.log('got marker for trip ' + trip.name);
        }
      },
      error: err => this.errorMessage = err}
    );
  }
}
