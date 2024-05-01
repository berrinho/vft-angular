import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, shareReplay, tap, throwError } from "rxjs";
import { Fieldtrip } from "./fieldtrip";


@Injectable({
    providedIn: 'root'
    }
)
export class FieldtripService {

    //fieldtripUrl = "http://localhost:8080/api/fieldtrips/5";
    fieldtripUrl = "https://fieldtripviewer.herokuapp.com/api/fieldtrips";
 
    constructor(private httpclient: HttpClient){}

    fieldTripList$ = this.httpclient.get<any>(this.fieldtripUrl)
    .pipe(
        map(response => {
            var tripList: Fieldtrip[];
            // Assuming the array is wrapped in an object called 'embedded/fieldtrips'
            tripList = response._embedded.fieldtrips;
            tripList.sort((a,b) =>
              ( a.name > b.name ? 1: -1)
            )
            return tripList;
          }),
          shareReplay(1),
        tap(data => console.log('All: ', data.length)),
        catchError(this.handleError)
    );


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