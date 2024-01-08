import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldguideService } from './fieldguide.service';
import { Species } from './species';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit, OnDestroy{

  species!: Species;
  sub! : Subscription;
  
  constructor(private fieldguideService: FieldguideService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    var speciesId:Number = Number(this.activatedRoute.snapshot.paramMap.get("id")); 

    this.sub=this.fieldguideService.getSpecies(speciesId).subscribe(
      { next: species => this.species = species }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
