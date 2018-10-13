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
import { PrintComponent } from './print/print.component';
import { PrintSkillComponent } from './print/print-skill/print-skill.component';
import { BackgroundComponent } from './background/background.component';
import { BackgroundService } from './background/background.service';
import { WikiService } from './core/wiki.service';
import { BadgeComponent } from './shared/badge/badge.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SurvivorComponent,
    SettingsComponent,
    SkillComponent,
    AboutComponent,
    PrintComponent,
    PrintSkillComponent,
    BackgroundComponent,
    BadgeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    SettingsService,
    SurvivorService,
    SkillService,
    LangService,
    BackgroundService,
    WikiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
