import { Component, OnDestroy, OnInit } from '@angular/core';
import { Species } from './species';
import { FieldguideService } from './fieldguide.service';
import { Subscription, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingIndicatorComponent } from '../shared/loading-indicator.component';

@Component({
  selector: 'app-fieldguide',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingIndicatorComponent],
  templateUrl: './fieldguide.component.html',
  styleUrl: './fieldguide.component.css'
})
export class FieldguideComponent implements OnInit, OnDestroy{

  loading = false;
  speciesList!: Species[];
  animalList!: Species[];
  otherSpeciesList!: Species[];
  sub! : Subscription;

constructor(private fieldguideService: FieldguideService){}

  ngOnInit(): void {
    this.loading = true;
    this.sub=this.fieldguideService.getSpeciesList()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
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
