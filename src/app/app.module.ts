import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import { SurvivorService } from './survivor/survivor.service';
import { SurvivorComponent } from './survivor/survivor.component';
import { AboutComponent } from './about/about.component';
import { LangService } from './core/lang.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SurvivorComponent,
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
  providers: [SettingsService, SurvivorService, SkillService, LangService],
  bootstrap: [AppComponent]
})
export class AppModule { }
