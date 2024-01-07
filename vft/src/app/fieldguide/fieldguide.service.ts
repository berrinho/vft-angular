import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError, map } from "rxjs";
import { Species } from "./species";

@Injectable({
    providedIn: 'root'
    }
)
export class FieldguideService{
    speciesUrl = "https://fieldtripviewer.herokuapp.com/api/species";


    constructor(private httpclient: HttpClient){}

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