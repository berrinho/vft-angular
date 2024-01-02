import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Fieldtrip } from "./fieldtrip";


@Injectable({
    providedIn: 'root'
    }
)
export class FieldtripService {

    fieldtripUrl = "http://localhost:8080/api/fieldtrips/5";

    constructor(private httpclient: HttpClient){}

    public getFieldtrip(apiLink: string): Observable<Fieldtrip> {
        this.fieldtripUrl=apiLink;
        return this.httpclient.get<Fieldtrip>(this.fieldtripUrl)
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