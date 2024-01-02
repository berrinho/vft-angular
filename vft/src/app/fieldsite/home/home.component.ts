import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldsiteService } from '../fieldsite.service';
import { Fieldsite } from '../fieldsite';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class FieldsiteHomeComponent implements OnInit, OnDestroy{

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
