import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Fieldsite } from './fieldsite';
import { Observable } from 'rxjs';
import { FieldsiteService } from './fieldsite.service';
import { Fieldtrip } from '../fieldtrip/fieldtrip';

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


  constructor(private siteService: FieldsiteService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    var siteId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    this.currentSite$ = this.siteService.getSite(siteId);
    this.currentTrip$ = this.siteService.getTripForSite(siteId);
  }
}
