import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, OperatorFunction, Subscription, defaultIfEmpty, filter, map, of } from 'rxjs';
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
  
  currentTrip$!: Observable<Fieldtrip>;
  sites!: Fieldsite[];
  errorMessage: string="";
  sub!: Subscription;
  
  constructor(private tripService: FieldtripService, private activatedRoute: ActivatedRoute){}

  ngAfterViewInit(): void {
    console.log("ng after view init called");
    console.log("state of current trip is " + this.currentTrip$);
    this.initMap();
  }

  ngOnInit(): void {
    //get trip id from the route parameters
    var tripId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    
    //use Observable already retrieved in service to find current fieldtrip
    this.currentTrip$ = this.tripService.fieldTripList$.pipe(
        map(tripList => tripList.find(trip => trip.id === tripId)),
        //this woowoo is to tell the compiler that undefined will never be returned
        filter(trip => trip !== undefined) as OperatorFunction<Fieldtrip | undefined, Fieldtrip>
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //initialize the fieldtrip map
  initMap(): void {

    this.sub = this.currentTrip$.subscribe(trip => {
          this.map = L.map('map', {
          center: [ trip.latitude, trip.longitude,  ],
          zoom: 12
        });

         //necessary due to bug in way angular imports the leaflet icons
         const myIcon = L.icon({
          iconUrl: 'assets/media/map-icon-green.png',
          shadowUrl: 'assets/media/marker-shadow.png',
        iconAnchor: [12,41]}
        );

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);

        for ( const site of trip.sortedSites) {
            const marker = L.marker([site.latitude, site.longitude ], 
              {icon: myIcon});
            marker.bindPopup("<b>" + site.name + "</b><br><a href='/fieldsite/" + site.id + "/" +trip.id+ "'>Visit</a>");
            marker.addTo(this.map);

        }
      }
    );
  }  
}
