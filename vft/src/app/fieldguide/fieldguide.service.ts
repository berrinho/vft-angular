import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError, map, shareReplay } from "rxjs";
import { Species } from "./species";

@Injectable({
    providedIn: 'root'
    }
)
export class FieldguideService{
    speciesUrl = "https://fieldtripviewer.herokuapp.com/api/species";

    speciesList$ = this.httpclient.get<any>(this.speciesUrl).pipe(
        map(response => {
            var speciesList: Species[];
            // Assuming the array is wrapped in an object called 'species' within the embedded codeing
            speciesList = response._embedded.species;
            speciesList.sort((a,b) =>
              ( a.speciesName > b.speciesName ? 1: -1)
            )
            return speciesList;
          }),
          shareReplay(1),
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
    );

    constructor(private httpclient: HttpClient){}

    /**
     * REMOVE THIS
     * @returns 
     */
    public getSpeciesList(): Observable<Species[]> {

        return this.httpclient.get<any>(this.speciesUrl)
        .pipe(
            map(response => {
                var speciesList: Species[];
                // Assuming the array is wrapped in an object called 'species' within the embedded codeing
                speciesList = response._embedded.species;
                speciesList.sort((a,b) =>
                  ( a.speciesName > b.speciesName ? 1: -1)
                )
                return speciesList;
              }),
              shareReplay(1),
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    /**
     * @todo convert to declarative using observable?
     * @param species_id 
     * @returns 
     */
    public getSpecies(species_id:Number): Observable<Species> {

        return this.httpclient.get<Species>(this.speciesUrl+"/"+String(species_id))
        .pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse): Observable<never>{
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}