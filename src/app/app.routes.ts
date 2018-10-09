import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CharacterComponent } from "./character/character.component";
import { SettingsComponent } from "./settings/settings.component";
import { AboutComponent } from "./about/about.component";

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'character', component: CharacterComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'about', component: AboutComponent }
]