import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Fieldsite } from "./fieldsite";
import { Injectable } from "@angular/core";
import { Observable, catchError, finalize, map, of, share, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
    }
)
export class FieldsiteService {


    indivSiteUrl = 'https://fieldtripviewer.herokuapp.com/api/sites/';
    sitesUrl = 'https://fieldtripviewer.herokuapp.com/api/sites';
    //indivSiteUrl = 'http://localhost:8080/api/sites/2';

 
    public cachedObservable!: Observable<any>;
    private cachedSiteId!: number;

    constructor(private httpclient: HttpClient){}

    public getSite(id: number): Observable<Fieldsite> {
        console.log("site id is " + id);


        if (!this.cachedObservable || id != this.cachedSiteId) {
            this.cachedObservable = this.httpclient.get<Fieldsite>(this.indivSiteUrl+id)
          .pipe(
            tap(site => this.cachedSiteId = site.id),
            share()
          );
        }
        return this.cachedObservable;
    }


    public getAllSites(): Observable<Fieldsite[]> {
        return this.httpclient.get<any>(this.sitesUrl)
            .pipe (
                map(response => {
                    var siteList: Fieldsite[];
                    // Assuming the array is wrapped in an object called 'sites'
                    siteList = response._embedded.sites;
                    siteList.sort((a,b) =>
                      ( a.name > b.name ? 1: -1)
                    )
                    return siteList;
                  })
            )
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