import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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
  constructor(private siteService: FieldsiteService){}

  ngOnInit(): void {
    this.sub = this.siteService.getSite(2).subscribe({
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
