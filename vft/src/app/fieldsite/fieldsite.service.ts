import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Fieldsite } from "./fieldsite";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
    }
)
export class FieldsiteService {

    indivSiteUrl = 'https://fieldtripviewer.herokuapp.com/api/sites/2';
    //indivSiteUrl = 'http://localhost:8080/api/sites/2';

    constructor(private httpclient: HttpClient){}

    public getSite(id: number): Observable<Fieldsite> {
        return this.httpclient.get<Fieldsite>(this.indivSiteUrl)
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