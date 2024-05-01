import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Fieldsite } from './fieldsite';
import { Observable, OperatorFunction, filter, map } from 'rxjs';
import { FieldsiteService } from './fieldsite.service';
import { Fieldtrip } from '../fieldtrip/fieldtrip';
import { FieldtripService } from '../fieldtrip/fieldtrip.service';

@Component({
  selector: 'app-fieldsite',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './fieldsite.component.html',
  styleUrl: './fieldsite.component.css'
})
export class FieldsiteComponent implements OnInit {
  currentSite$: Observable<Fieldsite> | undefined;
  currentTrip$: Observable<Fieldtrip> | undefined;
  errorMessage: string="";


  constructor(private tripService: FieldtripService, private siteService: FieldsiteService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    var tripId = Number(this.activatedRoute.snapshot.paramMap.get("tripid"));
    console.log("trip id is " + tripId);
    var siteId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    console.log("site id is " + siteId);

    //use Observable already retrieved in service to find current fieldtrip
    this.currentTrip$ = this.tripService.fieldTripList$.pipe(
      map(tripList => tripList.find(trip => trip.id === tripId)),
      //this woowoo is to tell the compiler that undefined will never be returned
      filter(trip => trip !== undefined) as OperatorFunction<Fieldtrip | undefined, Fieldtrip>
    );

    //use Observable already retrieved in service to find current fieldsite
    this.currentSite$ = this.tripService.fieldTripList$.pipe(
      map(tripList => tripList.find(trip => trip.id === tripId)),
      //this woowoo is to tell the compiler that undefined will never be returned
      filter(trip => trip !== undefined) as OperatorFunction<Fieldtrip | undefined, Fieldtrip>,
      map(trip => trip?.sortedSites.find(site => site.id === siteId)),
      filter(site => site !== undefined) as OperatorFunction<Fieldsite | undefined, Fieldsite>
    );

    //set the cached site observable to the current site for use in child routes
    this.siteService.cachedSiteObservable = this.currentSite$

  }
}
