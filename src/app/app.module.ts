import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { SettingsComponent } from './settings/settings.component';
import { SkillComponent } from './skill/skill.component';
import { SettingsService } from './settings/settings.service';
import { SkillService } from './skill/skill.service';
import { CharacterService } from './character/character.service';
import { CharacterComponent } from './character/character.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CharacterComponent,
    SettingsComponent,
    SkillComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [SettingsService, CharacterService, SkillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
