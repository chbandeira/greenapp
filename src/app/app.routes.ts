import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CharacterComponent } from "./character/character.component";
import { SettingsComponent } from "./settings/settings.component";

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'characters', component: CharacterComponent },
    { path: 'settings', component: SettingsComponent }
]