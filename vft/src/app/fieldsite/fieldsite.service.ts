import { Injectable } from "@angular/core";
import { Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
    }
)
export class FieldsiteService {
    //used on child routes of fieldsite page
    public cachedSiteObservable!: Observable<any>;
}