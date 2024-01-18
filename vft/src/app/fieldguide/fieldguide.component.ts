import { Component, OnDestroy, OnInit } from '@angular/core';
import { Species } from './species';
import { FieldguideService } from './fieldguide.service';
import { BehaviorSubject, EMPTY, Observable, Subscription, catchError, combineLatest, finalize, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingIndicatorComponent } from '../shared/loading-indicator.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-fieldguide',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingIndicatorComponent, FormsModule],
  templateUrl: './fieldguide.component.html',
  styleUrl: './fieldguide.component.css'
})
export class FieldguideComponent  {


  constructor(private fieldguideService: FieldguideService){}

  loading = false;

  private searchSpeciesSubject$ = new BehaviorSubject<string>("");
  searchSpeciesObs$ = this.searchSpeciesSubject$.asObservable();

  species$ = combineLatest( this.fieldguideService.speciesList$, this.searchSpeciesObs$).pipe
  (
    map( ([speciesList, searchFilter]) => speciesList.filter(species=>species.vernacularName.toLowerCase().includes(searchFilter) )) 
,
    tap( (obj) => console.log('Species found: ' + obj.length)  ),
      catchError(err => {
       //this.errorMessageSubject.next(err);
       return EMPTY;
     })
  );

  onSearch(searchFilter: string) {
    console.log(searchFilter);
    this.searchSpeciesSubject$.next(searchFilter);
    }

  public getBase64(arg0: string): String {
    return "data:image/png;base64,"+arg0;
    }
}
