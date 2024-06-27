import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FieldtripService } from '../fieldtrip/fieldtrip.service';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { Marker } from 'leaflet';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnDestroy{

  constructor(private fieldTripService: FieldtripService){}

  errorMessage: String = "";
  trips$ = this.fieldTripService.fieldTripList$;
  private map!: L.Map;
  private sub!: Subscription;

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

    //necessary due to bug in way angular imports the leaflet icons
    const myIcon = L.icon({
      iconUrl: 'assets/media/map-icon-green.png',
      shadowUrl: 'assets/media/marker-shadow.png',
    iconAnchor: [12,41]}
    );

    this.sub = this.trips$.subscribe({
      next: triplist => {
        for (let trip of triplist){
          console.log('looking up marker for trip ' + trip.name + ' lat ' + trip.latitude + ', long ' + trip.longitude);
          
          const marker = L.marker([trip.latitude, trip.longitude ], 
            {icon: myIcon});
          marker.bindPopup("<b>" + trip.name + "</b><br><a href='/fieldtrip/" + trip.id + "'>Visit</a>");
          marker.addTo(this.map);
          console.log('got marker for trip ' + trip.name);
        }
      },
      error: err => {
          this.errorMessage = err;
          console.log(err);
        }}
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
