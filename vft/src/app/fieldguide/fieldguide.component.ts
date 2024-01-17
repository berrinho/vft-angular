import { Component, OnDestroy, OnInit } from '@angular/core';
import { Species } from './species';
import { FieldguideService } from './fieldguide.service';
import { Subscription, finalize } from 'rxjs';
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
export class FieldguideComponent implements OnInit, OnDestroy{

  constructor(private fieldguideService: FieldguideService){}

  loading = false;
  speciesList!: Species[];
  animalList!: Species[];
  filteredAnimalList: Species[] = [];
  otherSpeciesList!: Species[];
  filteredOtherSpeciesList: Species[] = [];
  sub! : Subscription;
  private _listFilter: string ='';

  species$ = this.fieldguideService.speciesList$;



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
          this.filteredAnimalList=this.animalList;
          this.filteredOtherSpeciesList=this.otherSpeciesList;
          this.listFilter = '';
        }
      }  
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get listFilter():string{
    return this._listFilter;
}
set listFilter(value: string){
    this._listFilter = value;
    console.log("list filter = " + this._listFilter);
    this.filteredAnimalList = this.performAnimalFilter(value); 
    this.filteredOtherSpeciesList = this.performOtherFilter(value); 
}


performAnimalFilter(filterBy: string): Species[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.animalList.filter((species: Species) => 
    species.vernacularName.toLocaleLowerCase().includes(filterBy));
}
performOtherFilter(filterBy: string): Species[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.otherSpeciesList.filter((species: Species) => 
  species.vernacularName.toLocaleLowerCase().includes(filterBy));
}


  public getBase64(arg0: string): String {
    return "data:image/png;base64,"+arg0;
    }
}
