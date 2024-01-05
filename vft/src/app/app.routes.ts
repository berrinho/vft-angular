import { Routes } from '@angular/router';
import {FieldtripComponent} from './fieldtrip/fieldtrip.component';
import {FieldsiteComponent} from './fieldsite/fieldsite.component';
import {FieldsiteHomeComponent} from './fieldsite/home/home.component';
import { FieldsiteTourComponent } from './fieldsite/tour/tour.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'showcase', component: ShowcaseComponent},
    {path: 'fieldtrip/:id', component: FieldtripComponent},
    {path: 'fieldsite/:id', component: FieldsiteComponent, 
        children: [
                {path: '', component: FieldsiteHomeComponent},
                {path: 'home', component: FieldsiteHomeComponent},
                {path: 'tour', component: FieldsiteTourComponent}
                ]  
    }
];
