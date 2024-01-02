import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Fieldsite } from './fieldsite';
import { Subscription } from 'rxjs';
import { FieldsiteService } from './fieldsite.service';

@Component({
  selector: 'app-fieldsite',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './fieldsite.component.html',
  styleUrl: './fieldsite.component.css'
})
export class FieldsiteComponent implements OnInit, OnDestroy {
  currentSite!: Fieldsite;
  errorMessage: string="";
  sub!: Subscription;

  constructor(private siteService: FieldsiteService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    var siteId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    this.sub = this.siteService.getSite(siteId).subscribe({
      next: site => {
        this.currentSite = site;
      },
      error: err => this.errorMessage = err}
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
