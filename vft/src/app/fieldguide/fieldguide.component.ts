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
  animalList!: Species[];
  otherSpeciesList!: Species[];
  sub! : Subscription;

constructor(private fieldguideService: FieldguideService){}

  ngOnInit(): void {
    this.sub=this.fieldguideService.getSpeciesList().subscribe(
      {
        next: species => 
        { 
          this.speciesList = species;
          this.animalList = [];
          this.otherSpeciesList = [];
          species.forEach(
              e => { if (e.kingdom=='Animalia'){
                  this.animalList.push(e);
                }
                else {
                  this.otherSpeciesList.push(e);
                }
              }
          )
        }
      }  
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public getBase64(arg0: string): String {
    return "data:image/png;base64,"+arg0;
    }
}
