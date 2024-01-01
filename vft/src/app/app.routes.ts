import { Routes } from '@angular/router';
import {FieldtripComponent} from './fieldtrip/fieldtrip.component';
import {FieldsiteComponent} from './fieldsite/fieldsite.component';
import {FieldsiteHomeComponent} from './fieldsite/home/home.component';

export const routes: Routes = [
    {path: 'fieldtrip', component: FieldtripComponent},
    {path: 'fieldsite', component: FieldsiteComponent, 
        children: [{path: 'home', component: FieldsiteHomeComponent}]  }
];
