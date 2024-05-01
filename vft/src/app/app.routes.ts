import { Routes } from '@angular/router';
import {FieldtripComponent} from './fieldtrip/fieldtrip.component';
import {FieldsiteComponent} from './fieldsite/fieldsite.component';
import {FieldsiteHomeComponent} from './fieldsite/home/home.component';
import { FieldsiteTourComponent } from './fieldsite/tour/tour.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { HomeComponent } from './home/home.component';
import { FieldguideComponent } from './fieldguide/fieldguide.component';
import { SpeciesComponent } from './fieldguide/species.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'showcase', component: ShowcaseComponent},
    {path: 'fieldtripmap', component: MapComponent},
    {path: 'fieldguide', component: FieldguideComponent},
    {path: 'species/:id', component: SpeciesComponent},
    {path: 'fieldtrip/:id', component: FieldtripComponent},
    {path: 'fieldsite/:id/:tripid', component: FieldsiteComponent, 
        children: [
                {path: '', component: FieldsiteHomeComponent},
                {path: 'home/:id', component: FieldsiteHomeComponent},
                {path: 'tour/:id', component: FieldsiteTourComponent},
                {path: 'fieldguide/:id', component: FieldguideComponent}
                ]  
    }
];
