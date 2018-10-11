import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SurvivorComponent } from './survivor/survivor.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { PrintComponent } from './print/print.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'survivor', component: SurvivorComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'print', component: PrintComponent }
];
