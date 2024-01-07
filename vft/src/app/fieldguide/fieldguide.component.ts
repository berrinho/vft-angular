import { Component, OnDestroy, OnInit } from '@angular/core';
import { Species } from './species';
import { FieldguideService } from './fieldguide.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fieldguide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fieldguide.component.html',
  styleUrl: './fieldguide.component.css'
})
export class FieldguideComponent implements OnInit, OnDestroy{

  speciesList!: Species[];
  sub! : Subscription;

constructor(private fieldguideService: FieldguideService){}

  ngOnInit(): void {
    this.sub=this.fieldguideService.getSpeciesList().subscribe({
      next: species => this.speciesList = species,
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
